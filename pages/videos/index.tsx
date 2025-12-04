import { useEffect, useState } from "react";

interface VideoItem {
  id: number;
  title: string;
  url: string; // YouTube URL / ID / mp4 OK
  description?: string;
  banner?: {
    image: string;
    link: string;
  };
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

  function getPlayer(videoUrl: string, title: string) {
    if (videoUrl.endsWith(".mp4")) {
      return (
        <video
          src={videoUrl}
          controls
          playsInline
          className="w-full h-full object-cover rounded-xl"
        />
      );
    }

    let videoId = videoUrl;
    if (videoUrl.includes("youtu.be/")) videoId = videoUrl.split("youtu.be/")[1];
    else if (videoUrl.includes("watch?v=")) videoId = videoUrl.split("watch?v=")[1];
    else if (videoUrl.includes("embed/")) videoId = videoUrl.split("embed/")[1];
    if (videoId.includes("?")) videoId = videoId.split("?")[0];

    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        className="w-full h-full object-cover rounded-xl"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    );
  }

  return (
    <div className="bg-black min-h-screen w-full text-white px-6 py-12 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-14 neon-title w-full">
          動画ギャラリー
        </h1>
      </div>

      <style>{`
        html, body, #__next { background-color:#000 !important; }
        .neon-title {
          color:#00eaff;
          text-shadow:0 0 6px #00eaff,0 0 12px #00eaff,0 0 20px #00eaff;
        }
        .neon-card {
          border:1px solid rgba(0,255,255,0.3);
          box-shadow:0 0 10px rgba(0,255,255,0.25);
          transition:0.25s ease;
        }
        .neon-card:hover {
          box-shadow:0 0 16px rgba(0,255,255,0.5);
        }
        .player-frame {
          aspect-ratio:16 / 9;
          background:#111;
          border-radius:12px;
          overflow:hidden;
          width:100%;
          max-width:900px;
          margin-left:auto;
          margin-right:auto;
        }
        .detail-box {
          background:#0a0a0a;
          border-radius:12px;
          padding:20px;
          border:1px solid rgba(0,255,255,0.25);
          box-shadow:0 0 12px rgba(0,255,255,0.25);
          max-width:500px;
          margin-left:auto;
          margin-right:auto;
        }
      `}</style>

      <div className="space-y-20 max-w-7xl mx-auto">
        {videos.map((video) => (
          <div key={video.id} className="neon-card rounded-2xl p-6 bg-black/60">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start justify-center">

              <div className="player-frame">
                {getPlayer(video.url, video.title)}
              </div>

              <div className="detail-box">
                <h2 className="text-2xl font-semibold text-cyan-300 mb-4 text-center">
                  {video.title}
                </h2>

                <div
                  className="text-gray-200 text-base leading-relaxed mb-6"
                  dangerouslySetInnerHTML={{ __html: video.description || "" }}
                />

                {video.banner && (
                  <div className="text-center mt-6">
                    <a href={video.banner.link} target="_blank" rel="noopener noreferrer">
                      <img
                        src={video.banner.image}
                        alt="banner"
                        className="mx-auto w-full max-w-xs rounded-lg hover:opacity-80 transition"
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