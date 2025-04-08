"use client";
import { useEffect, useRef } from "react";
import Hls from "hls.js";

const LiveStream = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      const hls = new Hls();

      // Load the HLS stream
      hls.loadSource("http://localhost/hls/stream.m3u8");
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((err) => console.error("Video play error:", err));
      });

      return () => {
        hls.destroy();
      };
    }
  }, []);

  return (
    <div>
      <h2>Live Stream</h2>
      <video ref={videoRef} controls style={{ width: "100%", maxWidth: "800px" }} />
    </div>
  );
};

export default LiveStream;
