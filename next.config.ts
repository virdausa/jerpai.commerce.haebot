import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bodo.nerpai.space",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
