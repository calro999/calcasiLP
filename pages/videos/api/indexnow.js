import indexnow from 'indexnow-request';

export default async function handler(req, res) {
  try {
    // 検索エンジンに「更新したよ」と通知を出す命令
    await indexnow({
      host: 'calcasi-lp.vercel.app',
      key: '824596b7f9ea5784db91d73dbe461184',
      keyLocation: 'https://calcasi-lp.vercel.app/824596b7f9ea5784db91d73dbe461184.txt',
      urlList: [
        'https://calcasi-lp.vercel.app/', // 更新を伝えたいURL
      ],
    });

    return res.status(200).json({ message: 'Success' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}