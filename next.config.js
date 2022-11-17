/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    distDir: './build',
    images: { unoptimized: true },
    eslint: { ignoreDuringBuilds: true },
    publicRuntimeConfig: {
        apiUrl: process.env.NODE_ENV === 'development'
            ? 'http://localhost:8080/api' // development api
            : 'https://api.waaw.ca' // production api
    },
    env: {
        header: {
            title: 'WaaW | Automated Workforce Scheduling',
            description: 'Automated Workforce Scheduling app created by WAAW to help people and business to grow and thrive together',
            aboutUsDescription: 'WAAW Global inc is a software company that is started with a mission to help both business and talent community alike. It supports business of all sizes.',
            meta: {
                openGraph: {
                    // og:title and og:description are picked up from title and description itself
                    url: 'https://waaw.ca/',
                    image: 'https://waaw.ca/favicon.svg',
                    type: 'website'
                },
                keywords: 'shift scheduling, shifts, business management, find work, manage business, business app, freelance, hire help, hire workers',
                robots: 'index,follow',
                copyright: 'WAAW Global inc'
            }
        },
        endpoints: {
            user: {
                authorization: '/v1/unAuth/authenticate',
                registerNewUser: '/api/v1/unAuth/user/registration/new',
                verifyEmail: '/api/v1/unAuth/user/registration/verifyEmail',
                checkUserNameExistence: '/api/v1/unAuth/user/checkUserNameExistence',
                completeProfile: '/api/v1/registration/user/completeProfile',
                validateInviteKey: '/api/v1/unAuth/user/invitation/validateKey',
                registerByInvite: '/api/v1/unAuth/user/invitation/register',
                getUserDetails: '/v1/getAccount'
            }
        }
    }
}

module.exports = nextConfig;