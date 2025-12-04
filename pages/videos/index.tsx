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
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
    <div className="min-h-screen bg-black text-white px-4 py-10 font-sans">

      {/* ==== タイトル ==== */}
      <h1 className="text-center text-4xl sm:text-5xl font-bold mb-12 neon-title">
        動画ギャラリー
      </h1>

      <style>{`
        .neon-title {
          color: #00eaff;
          text-shadow: 0 0 6px #00eaff, 0 0 12px #00eaff, 0 0 20px #00eaff;
        }
        .neon-box {
          border: 1px solid rgba(0,255,255,0.3);
          box-shadow: 0 0 12px rgba(0,255,255,0.25);
          border-radius: 14px;
          background: rgba(15, 15, 15, 0.9);
        }
      `}</style>

      <div className="max-w-7xl mx-auto space-y-20">
        {videos.map((video) => (
          <div
            key={video.id}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10"
          >

            {/* ==== 左：動画（2カラムの 7/12）==== */}
            <div className="lg:col-span-7 neon-box p-4 flex justify-center">
              <div className="w-full max-w-3xl aspect-video rounded-lg overflow-hidden bg-black">
                {renderVideo(video.url)}
              </div>
            </div>

            {/* ==== 右：詳細欄（5/12）==== */}
            <div className="lg:col-span-5 neon-box p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
                  {video.title}
                </h2>

                <p className="text-gray-300 whitespace-pre-line mb-6">
                  {video.description || "説明文はありません。"}
                </p>

                {/* バナー画像 */}
                {video.bannerImage && (
                  <div className="text-center mt-6">
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
                          maxHeight: "180px",
                          maxWidth: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </a>
                  </div>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
