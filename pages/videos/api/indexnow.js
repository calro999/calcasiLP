import indexnow from 'indexnow-request';

export default async function handler(req, res) {
  const API_KEY = '824596b7f9ea5784db91d73dbe461184';
  const DOMAIN = 'calcasi-lp.vercel.app';

  try {
    await indexnow({
      host: DOMAIN,
      key: API_KEY,
      // txtファイルはpublic直下にある前提のURLです
      keyLocation: `https://${DOMAIN}/${API_KEY}.txt`,
      urlList: [
        `https://${DOMAIN}/`,
        // 他にインデックスさせたいURLがあればここに追加
      ],
    });

    return res.status(200).json({ 
      success: true, 
      message: 'IndexNow submission successful' 
    });
  } catch (error) {
    console.error('IndexNow error:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}