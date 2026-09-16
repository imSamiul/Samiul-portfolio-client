import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
