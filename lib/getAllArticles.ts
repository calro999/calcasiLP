import fs from "fs/promises"
import path from "path"
import { Article } from "@/lib/types" // ← ②で説明する型定義

export async function getAllArticles(lang: string): Promise<Article[]> {
  const articlesDir = path.join(process.cwd(), "contents", "articles", lang)
  let filenames: string[]

  try {
    filenames = await fs.readdir(articlesDir)
  } catch (err) {
    console.error(`[getAllArticles] フォルダが見つかりません: ${articlesDir}`)
    return []
  }

  const articlesPromises = filenames.map(async (filename) => {
    const filePath = path.join(articlesDir, filename)
    const fileContents = await fs.readFile(filePath, "utf8")
    const article = JSON.parse(fileContents)
    return {
      ...article,
      slug: `/article/${article.id}`, // ← 必須：記事URL用
    }
  })

  const articles = await Promise.all(articlesPromises)
  return articles.sort((a, b) => b.id - a.id)
}
