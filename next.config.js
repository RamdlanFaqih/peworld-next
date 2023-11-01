/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  images: {
    domains: ["upload.wikimedia.org", "freelogopng.com", "res.cloudinary.com"]
  },
}

module.exports = nextConfig
