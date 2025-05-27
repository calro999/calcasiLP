import { Article } from "@/lib/types"
import path from "path"
import fs from "fs"
import fsp from "fs/promises"

export async function getAllArticles(locale: "ja" | "en"): Promise<Article[]> {
  const articlesDir = path.join(process.cwd(), "contents", "articles", locale)

  try {
    const entries = await fsp.readdir(articlesDir, { withFileTypes: true })

    const files = entries.filter((entry) => entry.isFile()).map((entry) => entry.name)

    const articlePromises = files.map(async (filename) => {
      const filePath = path.join(articlesDir, filename)
      const fileContents = await fsp.readFile(filePath, "utf8")
      const article = JSON.parse(fileContents)
      return {
        ...article,
        slug: `/article/${article.id}`,
      }
    })

    const articles = await Promise.all(articlePromises)
    return articles.sort((a, b) => b.id - a.id)
  } catch (error) {
    console.warn(`[getAllArticles] フォルダが見つかりません: ${articlesDir}`)
    return []
  }
}
