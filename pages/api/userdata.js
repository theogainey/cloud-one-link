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
        const pipeline = redis.pipeline();
        let dataobject= user;
        dataobject.links.forEach((link) => {
          let linkfeild = link._id.toString();
          pipeline.hget (user.slug, linkfeild, function(_, value) {
            link.linkclicks=value;
          });
        });
        pipeline.hget (user.slug, "pageviews", function(_, value) {
          dataobject.views=value ;
        });
        await pipeline.exec().then((result) => {
          return  res.status(200).json({user: dataobject});
        })
      break
    case 'PUT':
      if (linkrank ) {
        var thislink = user.links.find((link)=>link.rank===(parseInt(linkrank)))
      }
      else {
        return res.status(404).json({ message: `Link not found` })
      }
      if (linktext && linkurl) {
          thislink.text=linktext
          thislink.url=linkurl
          await usercollection.updateOne({email: email}, {$set: {links:user.links}}, {upsert: true })
            .then((update) => { return res.status(200).json({update})})
      }
      else if (linktext) {
        thislink.text=linktext
        await usercollection.updateOne({email: email}, {$set: {links:user.links}}, {upsert: true })
          .then((update) => { return res.status(200).json({update})})
      }
      else if (linkurl) {
        thislink.url=linkurl
        await usercollection.updateOne({email: email}, {$set: {links:user.links}}, {upsert: true })
          .then((update) => { return res.status(200).json({update})})
      }
      else if (newrank) {
        let parsedRank = parseInt(newrank)
        if (parsedRank>0 && parsedRank<=user.links.length) {
          var otherlink = user.links.find(link=>link.rank===parsedRank);
          otherlink.rank=parseInt(linkrank)
          thislink.rank=parsedRank
          await usercollection.updateOne({email: email}, {$set: {links:user.links}}, {upsert: true })
            .then((update) => {  return res.status(200).json({update})})
        }
        else {
          return res.status(404).json({ message: 'new link rank out of range' })
        }
      }
      else {
        return res.status(404).json({ message: `No parameters to update` })
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
        await usercollection.updateOne({email: email}, {$set: {links:newlinks}}, {upsert: true })
          .then((update) => { return res.status(404).json({ message: update })})
      }
      else {
        return res.status(404).json({ message: `no link added` })
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
        await usercollection.updateOne({email: email}, {$set: {links:newlinks}}, {upsert: true })
          .then((update) => {return res.status(200).json({update})})
      }
      else {
        return res.status(404).json({ message: `Link not found` })
      }
      break;
    default:
      return res.status(405).end(`Method ${method} Not Allowed`)
  }
});
