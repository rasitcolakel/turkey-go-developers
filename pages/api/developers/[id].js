import axios from "axios";
export default async function getDeveloper(req, res) {
  try {
    const { method } = req;
    if (method === "GET") {
      const { id } = req.query;
      const protocol = req.headers["x-forwarded-proto"] || "http";
      const baseUrl = req ? `${protocol}://${req.headers.host}` : "";
      let response = await axios.get(`${baseUrl}/api/developers`);
      let developer = response.data.filter((d) => d[0] === id)[0];
      console.log(developer);
      res.json(developer !== undefined ? developer : []);
    } else {
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (e) {
    res.status(500).end(`Server error`, e.message);
  }
}
