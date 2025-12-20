// app/sitemap.ts
import { MetadataRoute } from 'next'
import fs from 'fs/promises'
import path from 'path'

const BASE_URL = 'https://calcasi.com'

// フォルダ内のJSONからURLエントリーを生成する共通関数
async function getJsonEntries(directoryName: string, routePrefix: string) {
  const dirPath = path.join(process.cwd(), 'contents', directoryName)
  try {
    const filenames = await fs.readdir(dirPath)
    return await Promise.all(
      filenames
        .filter(file => file.endsWith('.json'))
        .map(async (file) => {
          const filePath = path.join(dirPath, file)
          const content = JSON.parse(await fs.readFile(filePath, 'utf-8'))
          
          // ogUrlの末尾からスラッグを取得、なければIDを使用
          const slug = content.ogUrl 
            ? content.ogUrl.split('/').pop().toLowerCase() 
            : content.id.toString()

          return {
            url: `${BASE_URL}/${routePrefix}/${slug}`,
            lastModified: new Date(content.date || new Date()),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
          }
        })
    )
  } catch (e) {
    console.error(`Directory not found: ${directoryName}`)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. 各ディレクトリから動的URLを取得
  const strategyEntries = await getJsonEntries('strategies', 'strategies')
  const newsEntries = await getJsonEntries('news', 'news') // 最新情報がcontents/newsにある場合

  // 2. 固定ページの定義
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/tools`, // ツール（ダイス等）のページがある場合
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // 全てを統合
  return [...staticPages, ...strategyEntries, ...newsEntries]
}