
export default async function handler(req, res) {
  await fetch('http://localhost:5000/api/getlinks/byemail/theogainey@gmail.com').then(response => response.json()).then(data => {
    res.status(200).json({ linkData: data.linkData })
  })
}
