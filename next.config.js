/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["calcasi-lp.vercel.app"],
  },
  // 全てのページにおいてこれらのフォルダを読み取り可能にする
  experimental: {
    outputFileTracingIncludes: {
      '/**': ['./contents/**/*', './data/games/**/*'],
    },
  },
}
module.exports = nextConfig