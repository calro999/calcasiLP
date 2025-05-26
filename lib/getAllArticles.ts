import fs from "fs";
import path from "path";

export async function getAllArticles(locale: "ja" | "en") {
  const filePath = path.join(process.cwd(), "articles", `${locale}.json`);
  const fileContents = fs.readFileSync(filePath, "utf8");

  const data = JSON.parse(fileContents);

  // ✅ data が Object の場合も考慮して、配列形式に変換する
  if (Array.isArray(data)) {
    return data;
  } else {
    // 例えば Object の場合、values を配列として返す
    return Object.values(data);
  }
}
