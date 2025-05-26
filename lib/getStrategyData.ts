// /lib/getStrategyData.ts
import fs from "fs"
import path from "path"

export type Strategy = {
  id: number
  title: string
  description: string
  image: string
}

export function getAllStrategies(): Strategy[] {
  const strategiesDir = path.join(process.cwd(), "contents", "strategies")
  const fileNames = fs.readdirSync(strategiesDir)

  const strategies: Strategy[] = fileNames
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const filePath = path.join(strategiesDir, file)
      const fileContents = fs.readFileSync(filePath, "utf-8")
      return JSON.parse(fileContents)
    })

  return strategies
}

export function getStrategyById(id: string): Strategy | null {
  const filePath = path.join(process.cwd(), "contents", "strategies", `${id}.json`)
  if (!fs.existsSync(filePath)) return null

  const fileContents = fs.readFileSync(filePath, "utf-8")
  return JSON.parse(fileContents)
}
