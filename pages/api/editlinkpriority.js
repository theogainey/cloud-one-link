

export default async function handler(req, res) {
    const {
      query: { email, linkId, priority }
    }= req;
    var e = encodeURIComponent(email)

    await fetch(`http://localhost:5000/api/editlinkpriority/${e}/${linkId}/${priority}`,{method: "PUT"}).then(
    res.status(200).json({}));
}
