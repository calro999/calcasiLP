export const getHashedSeed = async (seed: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(seed);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
};

export const rollDice = ({ clientSeed, serverSeed, nonce }: { clientSeed: string, serverSeed: string, nonce: number }): number => {
  const encoder = new TextEncoder();
  const key = encoder.encode(serverSeed);
  const msg = encoder.encode(`${clientSeed}:${nonce}`);
  const cryptoKey = crypto.subtle.importKey('raw', key, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return cryptoKey.then(k => crypto.subtle.sign('HMAC', k, msg)).then(sig => {
    const hash = Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');
    const roll = parseInt(hash.slice(0, 8), 16) / 0xffffffff * 100;
    return parseFloat(roll.toFixed(2));
  });
};
