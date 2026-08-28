import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.hyderabadstartupsmap.com" }],
        destination: "https://hyderabadstartupsmap.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
