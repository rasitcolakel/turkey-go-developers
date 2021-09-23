import { google } from "googleapis";
export default async function getDevelopers(req, res) {
  const { method } = req;
  if (method === "GET") {
    const auth = await google.auth.getClient({
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });
    let id = 3;
    let data;
    const range = `Sheet1!A${parseInt(id)}:G${1000}`;
    const sheets = google.sheets({ version: "v4", auth });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range,
    });
    data = response.data.values.filter((d) => d[1]);
    res.setHeader("Cache-Control", "s-maxage=30");
    res.status(200).json(data);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
