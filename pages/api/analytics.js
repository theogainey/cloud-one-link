import redis from './../../lib/redis'

export default async function handler(req, res) {
  const {
    query: { linkID, pageSlug },
    method,
  } = req
  switch (method) {
    case 'PUT':
      if (linkID && pageSlug) {
        let linkfeild = linkID.toString();
        await redis.hincrby (pageSlug, linkfeild, 1);
        return res.status(200).json({});
      }
      else if (pageSlug) {
        await redis.hincrby (pageSlug, "pageviews", 1);
        return res.status(200).json({});
      }
      else {
        return res.status(404).json({ message: `Invaild Arguments` })
      }
      break;
    default:
       return res.status(404).json({ message: `HTTTP Method Not Supported` });
      break;
  }
}
