/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    distDir: './build',
    images: { unoptimized: true },
    eslint: { ignoreDuringBuilds: true },
    publicRuntimeConfig: {
        apiUrl: process.env.NODE_ENV === 'development'
            ? 'http://localhost:8080/api' // development api
            : 'https://api.waaw.ca/api' // production api
    },
    env: {
        version: '1.0',
        termsAndPrivacyData: {
            deployedAddress: 'www.waaw.ca',
            businessAddress: '25 Plentywood drive, Bramptom, Canada, L6Y 0V2',
            minAge: 18,
            customerSupport: 'waaw.management@waaw.ca'
        },
        firebase: {
            apiKey: "AIzaSyC9hb4US1VRHJqcYE4yZ9jQeOM6h6vJycE",
            authDomain: "waaw-waitlist.firebaseapp.com",
            projectId: "waaw-waitlist",
            storageBucket: "waaw-waitlist.appspot.com",
            messagingSenderId: "213804837638",
            appId: "1:213804837638:web:074369716cbebca22b0c87",
            measurementId: "G-YXEDFG0Y60"
        },
        header: {
            title: 'Automated Workforce Scheduling',
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
                robots: 'index, follow',
                copyright: 'WAAW Global inc'
            }
        },
        endpoints: {
            user: {
                authorization: '/v1/unAuth/authenticate',
                registerNewUser: '/v1/unAuth/user/registration/new',
                verifyEmail: '/v1/unAuth/user/registration/verifyEmail',
                checkUserNameExistence: '/v1/unAuth/user/checkUserNameExistence',
                completeProfile: '/v1/registration/user/completeProfile',
                validateInviteKey: '/v1/unAuth/user/invitation/validateKey',
                registerByInvite: '/v1/unAuth/user/invitation/register',
                getUserDetails: '/v1/user/getAccount',
                resetPasswordInit: '/v1/unAuth/user/resetPassword/init',
                resetPasswordFinish: '/v1/unAuth/user/resetPassword/finish'
            },
            dropdown: {
                getTimezones: '/v1/unAuth/timezone/get'
            }
        }
    }
}

module.exports = nextConfig;