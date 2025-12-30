import { useEffect, useState } from "react";
import Head from "next/head";
// ✅ 共通CSSをインポートしてTailwindを有効化
import "../../app/globals.css"; 
import Header from "../../components/Header";
import Footer from "../../components/Footer";

interface VideoItem {
  id: number;
  title: string;
  url: string;
  description?: string;
  bannerImage?: string;
  bannerLink?: string;
}

export default function VideosPage() {
  const [videos, setVideos] = useState<VideoItem[]>([]);

  // 表示したいXポストのIDを新しい順に配列に格納
  const xPostIds = [
    "2004852201714581550",
    "2004503320707391824",
    "2003769020538044485",
    "2003059697222595054",
    "2003057715120312805",
    "2001610077279785283",
    "1999061313306460668",
    "1999370377307509056"
  ];

  useEffect(() => {
    async function loadVideos() {
      try {
        const res = await fetch("/videos.json");
        const data: VideoItem[] = await res.json();
        setVideos(data);
      } catch (error) {
        console.error("Failed to load videos:", error);
      }
    }
    loadVideos();
  }, []);

  const renderVideo = (url: string) => {
    const ytMatch = url.match(
      /(youtu\.be\/|youtube\.com\/watch\?v=)([A-Za-z0-9_\-]+)/
    );

    if (ytMatch) {
      return (
        <iframe
          src={`https://www.youtube.com/embed/${ytMatch[2]}`}
          className="w-full h-full border-0"
          allowFullScreen
        />
      );
    }

    return (
      <video
        src={url}
        controls
        playsInline
        className="w-full h-full object-cover"
      />
    );
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Head>
        <title>【2026年最新版】動画ギャラリー｜人気カジノ動画を徹底チェック</title>
        <meta name="description" content="最新のカジノ動画をまとめた動画ギャラリーです。" />
      </Head>

      <Header />

      <main className="pt-32 pb-20 px-4 max-w-[1300px] mx-auto">
        <h1 className="text-4xl md:text-5xl text-center font-black text-[#67e8f9] mb-16 drop-shadow-[0_0_12px_rgba(0,234,255,0.8)]">
          動画ギャラリー
        </h1>

        <div className="flex flex-col gap-16 md:gap-20 max-w-[1100px] mx-auto">
          {videos.map((video) => (
            <div key={video.id} className="flex flex-col md:flex-row gap-8 p-6 rounded-2xl bg-[#111] border border-cyan-500/30 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
              <div className="md:flex-[7]">
                <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
                  {renderVideo(video.url)}
                </div>
              </div>

              <div className="md:flex-[3] flex flex-col justify-between">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-[#67e8f9] mb-4">
                    {video.title}
                  </h2>
                  <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                    {video.description}
                  </p>
                </div>

                {video.bannerImage && (
                  <div className="mt-6">
                    <a href={video.bannerLink} target="_blank" rel="noopener noreferrer">
                      <img
                        src={video.bannerImage}
                        alt="banner"
                        className="max-h-[132px] rounded-lg hover:scale-105 transition-transform duration-300"
                      />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 text-center">
          <h2 className="text-3xl font-bold text-[#67e8f9] mb-8">最新のX投稿</h2>
          <div className="h-[800px] overflow-y-auto bg-[#0a0a0a] rounded-2xl p-8 border border-cyan-900/30">
            <div className="flex flex-col items-center gap-10">
              {/* ✅ 修正：ID配列を使用して正しいエンドポイントから読み込む */}
              {xPostIds.map((id) => (
                <iframe
                  key={id}
                  src={`https://platform.twitter.com/embed/Tweet.html?id=${id}&theme=dark`}
                  style={{ width: '550px', height: '600px', maxWidth: '100%', border: 'none' }}
                  loading="lazy"
                  title={`X Post ${id}`}
                />
              ))}
            </div>
          </div>
          <a
            href="https://x.com/calro_shorts"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-10 px-10 py-4 bg-[#67e8f9] text-black font-black rounded-full shadow-[0_0_20px_rgba(103,232,249,0.5)] hover:scale-105 transition-transform"
          >
            Xで全ての投稿を見る →
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}