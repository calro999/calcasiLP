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
        ===== ページ専用の最強CSS（layout, styleを強制適用） =====
      */}
      <style>{`
        /* タイトルの中央寄せとスタイルを強制 */
        .neon-title {
          color: #00eaff !important;
          text-shadow: 0 0 6px #00eaff, 0 0 12px #00eaff, 0 0 20px #00eaff !important;
          text-align: center !important; /* 中央寄せを強制 */
        }
        /* Boxのスタイルを強制 */
        .box {
          border: 1px solid rgba(0,255,255,0.3) !important;
          box-shadow: 0 0 12px rgba(0,255,255,0.25) !important;
          border-radius: 14px !important;
          background: #111 !important;
        }

        /*
          7:3 レイアウトを強制するカスタムグリッド
          Tailwindの grid/col-span クラスを外し、このCSSで制御
        */
        .video-item-row {
          display: grid !important;
          grid-template-columns: 1fr !important; /* モバイルデフォルト（縦積み） */
          gap: 2.5rem !important; /* gap-10 */
        }

        /* 768px (mdブレークポイント) 以上で7:3のグリッドを適用 */
        @media (min-width: 768px) {
          .video-item-row {
            grid-template-columns: 7fr 3fr !important; /* 70% と 30% の比率を強制 */
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto space-y-20">
        {videos.map((video) => (
          <div
            key={video.id}
            // Taildwind gridを外し、カスタムCSSクラスを適用
            className="video-item-row"
          >

            {/* ===== 左：大きい動画枠 (70%) ===== */}
            {/* レイアウトに関するTailwindクラスを全て削除 */}
            <div className="box p-4">
              <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
                {renderVideo(video.url)}
              </div>
            </div>

            {/* ===== 右：詳細欄 (30%) ===== */}
            {/* レイアウトに関するTailwindクラスを全て削除 */}
            <div className="box p-6 flex flex-col justify-between">
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