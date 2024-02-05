/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pocketbase-production-3349.up.railway.app",
      },
    ],
  },
}

export default nextConfig
