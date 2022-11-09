/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    distDir: './build',
    images: { unoptimized: true },
    env: {
        appTitle: 'WaaW | Automated Workforce Scheduling',
        appDescription: 'Automated Workforce Scheduling app created by WAAW to help people and business to grow and thrive together',
        appUrl: 'https://waaw.ca/',
        appImage: 'https://waaw.ca/logo.svg',
        seoTags: 'shift scheduling, shifts, business management, find work, manage business, business app, freelance, hire help, hire workers'
    }
}

module.exports = nextConfig;