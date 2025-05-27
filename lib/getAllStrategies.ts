// lib/getAllStrategies.ts
import fs from "fs";
import path from "path";
import { Strategy } from "@/lib/types";

const strategiesDir = path.join(process.cwd(), "contents", "strategies");

export async function getAllStrategies(): Promise<Strategy[]> {
  const files = fs.readdirSync(strategiesDir);
  const strategies: Strategy[] = [];

  for (const file of files) {
    const filePath = path.join(strategiesDir, file);
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const strategy: Strategy = JSON.parse(fileContents);
    strategies.push(strategy);
  }

  return strategies.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
