/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    distDir: './build',
    images: { unoptimized: true },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/home',
                permanent: true,
            }
        ]
    }
}

module.exports = nextConfig;