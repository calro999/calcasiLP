import { useEffect, useState } from "react";

interface VideoItem {
  id: number;
  title: string;
  url: string;
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

  return (
    <div className="page">
      <h1 className="title">動画ギャラリー</h1>

      <div className="videos">
        {videos.map((video) => (
          <div key={video.id} className="videoWrapper">
            <h2 className="videoTitle">{video.title}</h2>

            {/* ★ これがメイン動画プレイヤー ★ */}
            <div className="playerArea">
              <video
                src={video.url}
                controls
                playsInline
                preload="metadata"
              />
            </div>
          </div>
        ))}
      </div>

      {/* CSS ---------------------------- */}
      <style>{`
        .page {
          background: #000;
          min-height: 100vh;
          padding: 40px 20px;
        }

        .title {
          text-align: center;
          color: #67e8f9;
          font-size: 32px;
          margin-bottom: 40px;
          text-shadow: 0 0 10px #00eaff, 0 0 20px #00eaff;
        }

        .videos {
          display: flex;
          flex-direction: column;
          gap: 70px;
          align-items: center;
        }

        .videoWrapper {
          width: 100%;
          max-width: 900px;
        }

        .videoTitle {
          color: #fff;
          margin-bottom: 12px;
          font-size: 20px;
        }

        .playerArea {
          width: 100%;
          background: #1c1c1c;
          border-radius: 12px;
          padding: 0;
          overflow: hidden;
          border: 2px solid #00eaff;
          box-shadow: 0 0 20px #00eaff55;
        }

        .playerArea video {
          width: 100%;
          height: auto;
          aspect-ratio: 16/9;
          display: block;
        }

        @media (max-width: 600px) {
          .title {
            font-size: 26px;
          }
          .videoTitle {
            font-size: 18px;
          }
        }
      `}</style>
    </div>
  );
}
