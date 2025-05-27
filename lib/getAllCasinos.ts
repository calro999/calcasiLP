// /lib/getAllCasinos.ts
import { casinoData } from "./casinoData";
import { Casino } from "./types";

export async function getAllCasinos(lang: "ja" | "en"): Promise<Casino[]> {
  // 今後の拡張のため lang を受け取るが、現在は共通データを返す
  return casinoData as Casino[];
}
