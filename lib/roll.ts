// lib/roll.ts

// サーバーシードのハッシュを生成する（SHA-256）
export const getHashedSeed = async (seed: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(seed);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

// Provably Fair に基づいてダイス結果を生成（0.00〜100.00）
export const rollDice = async ({
  clientSeed,
  serverSeed,
  nonce,
}: {
  clientSeed: string;
  serverSeed: string;
  nonce: number;
}): Promise<number> => {
  const encoder = new TextEncoder();
  const key = encoder.encode(serverSeed);
  const msg = encoder.encode(`${clientSeed}:${nonce}`);

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    key,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const sig = await crypto.subtle.sign("HMAC", cryptoKey, msg);
  const hash = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  const roll = (parseInt(hash.slice(0, 8), 16) / 0xffffffff) * 100;
  return parseFloat(roll.toFixed(2));
};
