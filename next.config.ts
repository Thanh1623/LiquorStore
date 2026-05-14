import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "chuyenruouvangnhapkhau.com",
      },
      {
        protocol: "https",
        hostname: "vintagewine.vn",
      },
      {
        protocol: "https",
        hostname: "swirlwinegroup.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "ixjezfxiderzegqfvukc.supabase.co",
      },
    ],
  },
};

export default nextConfig;
