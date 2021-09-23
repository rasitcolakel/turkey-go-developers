import { google } from "googleapis";

export async function getServerSideProps({ query }) {
  const auth = await google.auth.getClient({
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
  let { id } = query;
  id = parseInt(id) + 2;
  const range = `Sheet1!A${parseInt(id)}:G${parseInt(id)}`;
  const sheets = google.sheets({ version: "v4", auth });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range,
  });

  const [, name, company, socialMedia] = response.data.values[0];
  console.log(response.data);
  return { props: { name, company, socialMedia } };
}

export default function Post({ name, company, socialMedia }) {
  let matches = socialMedia.match(
    /http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/
  );
  let image = matches ? matches[1] : "GoTurkiye_";
  console.log("123", image);
  return (
    <div class="grid grid-cols-3 gap-4">
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
    </div>
  );
}
