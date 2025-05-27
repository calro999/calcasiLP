import fs from "fs/promises"
import path from "path"

export interface Article {
  id: number
  title: string
  excerpt: string
  image: string
  category: string
  date: string
  readTime: string
  author: string
  content: string
}

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
    const article: Article = JSON.parse(fileContents)
    return article
  })

  const articles = await Promise.all(articlesPromises)
  return articles.sort((a, b) => b.id - a.id) // ID降順で並べる（新しい記事が先）
}
