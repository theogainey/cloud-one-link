
export async function getLinkData(slug) {
  const res = await fetch(`http://localhost:5000/api/getlinks/byslug/${slug}`)
  const linkData = await res.json()
  return linkData;
}
