// app/sitemap.ts
import { MetadataRoute } from 'next'
import fs from 'fs/promises'
import path from 'path'

const BASE_URL = 'https://calcasi-lp.vercel.app'

async function getJsonEntries(directoryName: string, routePrefix: string) {
  // 階層が深い（ja/1.jsonなど）場合に対応するため、再帰的に探すか、特定のパスを指定
  const dirPath = path.join(process.cwd(), 'contents', directoryName, 'ja')
  
  try {
    const filenames = await fs.readdir(dirPath)
    return await Promise.all(
      filenames
        .filter(file => file.endsWith('.json'))
        .map(async (file) => {
          const filePath = path.join(dirPath, file)
          const content = JSON.parse(await fs.readFile(filePath, 'utf-8'))
          
          // ogUrlがある場合はそこからスラッグを取得、なければIDを使用
          // ここでURLが https://calcasi-lp.vercel.app/article/xxx になるように調整
          const slug = content.ogUrl 
            ? content.ogUrl.split('/').pop().toLowerCase() 
            : content.id.toString()

          return {
            url: `${BASE_URL}/${routePrefix}/${slug}`,
            lastModified: new Date("2025-12-20"), // 全て12/20に固定
            changeFrequency: 'weekly' as const,
            priority: 0.8,
          }
        })
    )
  } catch (e) {
    console.error(`Error loading ${directoryName}:`, e)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 各カテゴリのJSONを読み込み
  const strategyEntries = await getJsonEntries('strategies', 'strategies')
  const articleEntries = await getJsonEntries('articles', 'article') // Prefixをarticleに合わせる

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date("2025-12-20"),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ]

  return [...staticPages, ...strategyEntries, ...articleEntries]
}