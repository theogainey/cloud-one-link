
export default async function handler(req, res) {
    const {
      query: { email, linkId}
    }= req;
    await fetch(`http://localhost:5000/api/deletelink/${email}/${linkId}`,{method: "DELETE"}).then(
    res.status(200).json({ }));
}
