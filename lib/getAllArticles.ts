import fs from "fs/promises";
import path from "path";

export async function getAllArticles(locale: "ja" | "en") {
  const dir = path.join(process.cwd(), "articles", locale);
  try {
    const files = await fs.readdir(dir);
    const articles = await Promise.all(
      files
        .filter((file) => file.endsWith(".json"))
        .map(async (file) => {
          const content = await fs.readFile(path.join(dir, file), "utf-8");
          return JSON.parse(content);
        })
    );
    return articles;
  } catch (err) {
    return []; // フォルダが無い・空でもOKにする
  }
}
