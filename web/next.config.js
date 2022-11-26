/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
}

module.exports = {
  images: {
    domains: [
      'platform-lookaside.fbsbx.com',
      'links.papareact.com',
      'scontent.fldb2-1.fna.fbcdn.net',
      'images.unsplash.com',
      'reactjs.org'
    ],
  }
};
