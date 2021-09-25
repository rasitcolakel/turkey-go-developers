import { google } from "googleapis";
import { reseller } from "googleapis/build/src/apis/reseller";
export default async function getDevelopers(req, res) {
  try {
    const { method } = req;
    if (method === "GET") {
      const target = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
      const jwt = new google.auth.JWT(
        process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        null,
        (process.env.GOOGLE_SHEETS_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
        target
      );
      const range = `Sheet1!A${parseInt(3)}:F${1000}`;

      const sheets = google.sheets({ version: "v4", auth: jwt });
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SHEET_ID,
        range: range, // sheet name
      });

      const data = response.data.values.filter((d) => d[1]);
      res.setHeader("Cache-Control", "s-maxage=30");
      res.status(200).json(data);
    } else {
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (err) {
    res.status(500).end(`Server error`, e.message);
    console.log(err);
  }
}
