

export default async function handler(req, res) {
    const {
      query: { email, linkId, text, url }
    }= req;
    var u = encodeURIComponent(url)
    var e = encodeURIComponent(email)
    var t = encodeURIComponent(text);

    await fetch(`http://localhost:5000/api/editlink/${e}/${linkId}/${t}/${u}`,{method: "PUT"}).then(
    res.status(200).json({}));
}
