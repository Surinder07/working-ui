export const ImagesInfo = {
    logo: {
        src: '/logo.svg',
        link: '/',
        alt: 'logo',
        // Destkop Size: 1, Tab Size: 2, Mobile Size: 3
        headerHeight: {1: 50, 2: 45, 3: 40},
        footerHeight: {1: 50, 2: 45, 3: 50}
    },
    footerIcons: {
        // Destkop Size: 1, Tab Size: 2, Mobile Size: 3
        height: {1: 25, 2:20, 3: 20},
        language: {
            src: '/icons/GlobeIcon.svg',
            link: '#',
            alt: 'language'
        },
        location: {
            src: '/icons/LocationIcon.svg',
            link: '#',
            alt: 'location',
        },
        socialIcons: [
            {
                alt: 'facebook',
                src: '/icons/socials/FacebookIcon.svg',
                link: 'https://facebook.com'
            },
            {
                alt: 'instagram',
                src: '/icons/socials/InstagramIcon.svg',
                link: 'https://instagram.com'
            },
            {
                alt: 'twitter',
                src: '/icons/socials/TwitterIcon.svg',
                link: 'https://twitter.com'
            },
            {
                alt: 'linkedin',
                src: '/icons/socials/LinkedInIcon.svg',
                link: 'https://linkedin.com'
            },
            {
                alt: 'youtube',
                src: '/icons/socials/YoutubeIcon.svg',
                link: 'https://youtube.com'
            }
        ],
        mobileApps: {
            // Destkop Size: 1, Tab Size: 2, Mobile Size: 3
            height: {1: 30, 2: 25, 3: 20},
            google: {
                alt: 'Download Android App',
                src: '/icons/mobileApps/PlayStore.svg',
                link: '#'
            },
            apple: {
                alt: 'Download IOS App',
                src: '/icons/mobileApps/AppleStore.svg',
                link: '#'
            }
        }
    }
}