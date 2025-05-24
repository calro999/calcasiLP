import "dotenv/config";
import fs from "fs";
import path from "path";
import { google } from "googleapis";

async function main() {
  const credentialsPath = process.env.GOOGLE_SHEETS_CREDENTIALS_PATH!;
  const raw = fs.readFileSync(credentialsPath, "utf8");
  const credentials = JSON.parse(raw);

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: "1bBY1jMtqxUkPTEvlyTxKZGRcSZojd7kQDrqL9gdxAZM", // ← ここだけ直書き
    range: "Sheet1!A2:E", // ← シート名が違う場合はここも変更
  });

  const rows = res.data.values;
  if (!rows) return;

  for (const row of rows) {
    const [title, date, slug, thumbnail, content] = row;
    const md = `---
title: "${title}"
slug: "${slug}"
date: "${date}"
thumbnail: "${thumbnail}"
---

${content}
`;
    const filePath = path.join("contents/blog", `${date}-${slug}.md`);
    fs.writeFileSync(filePath, md);
  }
}

main().catch(console.error);
