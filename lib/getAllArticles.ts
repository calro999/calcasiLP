import fs from "fs";
import path from "path";

export async function getAllArticles(locale: "ja" | "en") {
  try {
    const filePath = path.join(process.cwd(), "articles", `${locale}.json`);
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.warn(`Articles for locale "${locale}" not found.`);
    return []; // ファイルがなければ空配列を返す
  }
}
