import { useEffect, useState } from "react";

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

  useEffect(() => {
    async function loadVideos() {
      const res = await fetch("/videos.json");
      const data: VideoItem[] = await res.json();
      setVideos(data);
    }
    loadVideos();
  }, []);

  const renderVideo = (url: string) => {
    const ytMatch = url.match(
      /(youtu\.be\/|youtube\.com\/watch\?v=)([A-Za-z0-9_\-]+)/
    );
    if (ytMatch) {
      const videoId = ytMatch[2];
      return (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          className="w-full h-full"
          style={{ border: 0 }}
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
    <div className="min-h-screen bg-black text-white px-4 py-10">

      {/* ===== タイトル（中央寄せ） ===== */}
      <h1 className="text-center text-4xl sm:text-5xl font-bold mb-12 neon-title">
        動画ギャラリー
      </h1>

      {/*
        ===== ページ専用の最強CSS =====
        !important を追加し、外部CSSの影響を排除
      */}
      <style>{`
        .neon-title {
          color: #00eaff !important;
          text-shadow: 0 0 6px #00eaff, 0 0 12px #00eaff, 0 0 20px #00eaff !important;
        }
        .box {
          border: 1px solid rgba(0,255,255,0.3) !important;
          box-shadow: 0 0 12px rgba(0,255,255,0.25) !important;
          border-radius: 14px !important;
          background: #111 !important;
        }
      `}</style>

      <div className="max-w-7xl mx-auto space-y-20">
        {videos.map((video) => (
          <div
            key={video.id}
            className="grid grid-cols-1 md:grid-cols-12 gap-10"
          >

            {/*
              ===== 左：大きい動画枠 (7:3の「7」部分 - md:col-span-8) =====
            */}
            <div className="md:col-span-8 box p-4">
              <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
                {renderVideo(video.url)}
              </div>
            </div>

            {/*
              ===== 右：詳細欄 (7:3の「3」部分 - md:col-span-4) =====
            */}
            <div className="md:col-span-4 box p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
                  {video.title}
                </h2>

                <p className="text-gray-300 whitespace-pre-line mb-6">
                  {video.description || "説明文はありません。"}
                </p>
              </div>

              {/* ===== バナー ===== */}
              {video.bannerImage && (
                <div className="mt-6 text-center">
                  <a
                    href={video.bannerLink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={video.bannerImage}
                      alt="banner"
                      className="mx-auto rounded-lg"
                      style={{
                        maxHeight: "160px",
                        maxWidth: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </a>
                </div>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}