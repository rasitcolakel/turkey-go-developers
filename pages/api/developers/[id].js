import axios from "axios";
export default async function getDeveloper(req, res) {
  const { method } = req;
  if (method === "GET") {
    const { id } = req.query;
    const protocol = req.headers["x-forwarded-proto"] || "http";
    const baseUrl = req ? `${protocol}://${req.headers.host}` : "";
    let response = await axios.get(`${baseUrl}/api/developers`);
    let developer = response.data;
    res.json(developer.filter((d) => d[0] === id)[0]);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
