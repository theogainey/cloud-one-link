import clientPromise from './../../lib/mongodb'
import {ObjectID} from 'mongodb'
import { withApiAuthRequired, getSession} from '@auth0/nextjs-auth0';
import redis from './../../lib/redis'

export default withApiAuthRequired(async function userHandler(req, res) {
  const {
    query: { displayname, slug},
    method,
  } = req
  const session = getSession(req, res);
  const email = session.user.email

  if (method==='POST') {
    const client = await clientPromise
    var newLinkID = new ObjectID();
    const newuser = {
      _id: newLinkID,
      email: email,
      slug: slug,
      displayname: displayname,
      theme: "default",
      links: [
        {
          _id: newLinkID,
          rank: 1,
          text: "Link Text ",
          url: "Link URL "
        }
      ]
    }
    const update = await client.db("cloudlandingpage").collection("users").insertOne(newuser);
    if (update) {
      var linkfeild = newLinkID.toString();
      redis.hset (slug, "pageviews", 0);
      redis.hset (slug, linkfeild, 0);
      res.status(200).json({update})
    }
    else {
      res.status(404).json({ message: 'user profile not created' })
    }
  }
  else {
    res.status(404).json({ message: 'user profile not created' })
  }

})
