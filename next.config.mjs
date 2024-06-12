/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "careerhive.blob.core.windows.net",
      }
    ],
  },
  transpilePackages: ["lucide-react"],
};

export default nextConfig;
