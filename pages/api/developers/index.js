import { google } from "googleapis";
const fs = require("fs");
const moment = require("moment");
export default async function getDevelopers(req, res) {
  const { method } = req;
  const file = "developers.json";

  if (method === "GET") {
    let birthtime,
      isReadable = false;
    while (!isReadable) {
      try {
        birthtime = fs.statSync(file).birthtime;
        isReadable = true;
      } catch (err) {
        console.log("error no file found, creating and will try again");
        fs.writeFileSync(file, JSON.stringify([]));
      }
    }
    const auth = await google.auth.getClient({
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });
    let id = 3;

    let now = moment(new Date());
    let created = moment(birthtime);
    let difference = now.diff(created, "seconds");
    let data;
    if (difference <= 30) {
      data = JSON.parse(fs.readFileSync(file));
      console.log("from cache");
    } else {
      fs.unlink(file, function (err) {
        if (err) throw err;
        console.log("File deleted!");
      });
      const range = `Sheet1!A${parseInt(id)}:G${1000}`;
      const sheets = google.sheets({ version: "v4", auth });
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SHEET_ID,
        range,
      });
      data = response.data.values.filter((d) => d[1]);
      fs.writeFileSync(file, JSON.stringify(data));
      console.log("from api");
    }

    res.status(200).json(data);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
