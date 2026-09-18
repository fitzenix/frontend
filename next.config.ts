import type { NextConfig } from "next";

const USE_REMOTE_API = process.env.NEXT_PUBLIC_USE_REMOTE_API !== "false";
const API_ORIGIN = (
  USE_REMOTE_API
    ? process.env.NEXT_PUBLIC_REMOTE_API_URL
    : process.env.NEXT_PUBLIC_LOCAL_API_URL
)?.replace(/\/$/, "") ??
  (USE_REMOTE_API ? "https://api.fitzenix.app" : "http://localhost:4000");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75, 88, 92],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "fitzenix.app" }],
        destination: "https://www.fitzenix.app/:path*",
        permanent: true,
      },
    ];
  },
  /** Local Frontend → proxy → API origin (avoids CORS on localhost:3000) */
  async rewrites() {
    return [
      {
        source: "/backend-api/:path*",
        destination: `${API_ORIGIN}/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/favicon.ico",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, immutable" },
          { key: "Content-Type", value: "image/x-icon" },
        ],
      },
      {
        source: "/favicon.png",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, immutable" }],
      },
      {
        source: "/icons/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, immutable" }],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
