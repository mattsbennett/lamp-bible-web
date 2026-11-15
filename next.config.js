/** @type {import('next').NextConfig} */
const nextConfig = {
  // The apps call it Writing; the old address keeps working for links already out there.
  async redirects() {
    return [{ source: '/docs/devotionals', destination: '/docs/writing', permanent: true }]
  },
}

module.exports = nextConfig
