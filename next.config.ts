import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
      remotePatterns: [
        { protocol: "https", hostname: "i.pravatar.cc" },
        { protocol: "https", hostname: "images.unsplash.com" }, // 👈 thêm dòng này
        // thêm domain CDN avatar/cover thật của bạn ở đây
      ],
    },
};

export default nextConfig;
