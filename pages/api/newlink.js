

export default async function handler(req, res) {
    const {
      query: { email, text, url }
    }= req;
    var u = encodeURIComponent(url)
    var e = encodeURIComponent(email)
    var t = encodeURIComponent(text);
    await fetch(`http://localhost:5000/api/newlink/${e}/${t}/${u}`,{method: "POST"}).then(
    res.status(200).json({}));
}
