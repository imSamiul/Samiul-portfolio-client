import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/projects/allProjects",
        destination: "/projects",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
