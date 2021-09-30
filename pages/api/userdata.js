import clientPromise from './../../lib/mongodb'
import {ObjectID} from 'mongodb'
import { withApiAuthRequired, getSession} from '@auth0/nextjs-auth0';
import redis from './../../lib/redis'

export default withApiAuthRequired(async function userHandler(req, res) {
  const {
    query: { linkrank, linktext, linkurl, linkID, newrank },
    method,
  } = req
  const session = getSession(req, res);
  const email = session.user.email

  const client = await clientPromise
  const usercollection = await client.db("cloudlandingpage").collection("users")
  const user = await usercollection.findOne({email: email})

  switch (method) {
    case 'GET':
      if (linkID) {
        let linkfeild = linkID.toString();
        await redis.hget (user.slug, linkfeild, function(_, value) {
          res.status(200).json({linkclicks: value});
        });
      }
      else {
        await redis.hget (user.slug, "pageviews", function(_, value) {
          res.status(200).json({views:value , user});
        });
      }
      break
    case 'PUT':
      if (linkrank ) {
        var thislink = user.links.find((link)=>link.rank===(parseInt(linkrank)))
      }
      else {
        res.status(404).json({ message: `Link not found` })
      }
      if (linktext && linkurl) {
          thislink.text=linktext
          thislink.url=linkurl
          const update = await usercollection.updateOne({email: email}, {$set: {links:user.links}}, {upsert: true })
          res.status(200).json({update})
      }
      else if (linktext) {
        thislink.text=linktext
        const update = await usercollection.updateOne({email: email}, {$set: {links:user.links}}, {upsert: true })
        res.status(200).json({update})
      }
      else if (linkurl) {
        thislink.url=linkurl
        const update = await usercollection.updateOne({email: email}, {$set: {links:user.links}}, {upsert: true })
        res.status(200).json({update})
      }
      else if (newrank) {
        let parsedRank = parseInt(newrank)
        if (parsedRank>0 && parsedRank<=user.links.length) {
          var otherlink = user.links.find(link=>link.rank===parsedRank);
          otherlink.rank=parseInt(linkrank)
          thislink.rank=parsedRank
          const update = await usercollection.updateOne({email: email}, {$set: {links:user.links}}, {upsert: true })
          res.status(200).json({update})
        }
        else {
          res.status(404).json({ message: 'new link rank out of range' })
        }
      }
      else {
        res.status(404).json({ message: `No parameters to update` })
      }
    break;
    case 'POST': {
      if (linktext && linkurl) {
        var newlinks = user.links;
        var newLinkID = new ObjectID();
        newlinks.push({
          _id: newLinkID,
          rank: newlinks.length+1,
          text: linktext,
          url: linkurl
        })
        var linkfeild = newLinkID.toString();
        redis.hset (user.slug, linkfeild, 0);
        const update = await usercollection.updateOne({email: email}, {$set: {links:newlinks}}, {upsert: true })
        res.status(404).json({ message: update })

      }
      else {
        res.status(404).json({ message: `no link added` })
      }

    }
    case 'DELETE':
      if (linkrank ) {
        var sortedlinks=user.links.sort((a, b) => a.rank - b.rank);
        var i=1;
        var newlinks=[];
        sortedlinks.forEach((link) => {
          if (link.rank!=linkrank) {
            link.rank=i;
            newlinks.push(link);
            i=i+1;
          }
        });
        const update = await usercollection.updateOne({email: email}, {$set: {links:newlinks}}, {upsert: true })
        res.status(200).json({update})
      }
      else {
        res.status(404).json({ message: `Link not found` })
      }
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`)
  }

});
