import {
    Logo,
    LogoWhite,
    GlobeIcon,
    LocationIcon,
    FacebookIcon,
    InstagramIcon,
    TwitterIcon,
    YoutubeIcon,
    LinkedInIcon,
    PlayStore,
    AppleStore
} from '../public/images';


const logo = {
    default: {
        src: Logo,
        link: '/',
        alt: 'logo'
    },
    white: {
        src: LogoWhite,
        link: '/',
        alt: 'logo'
    }
}

const footerIcons = {
    language: {
        src: GlobeIcon,
        link: '#',
        alt: 'language'
    },
    location: {
        src: LocationIcon,
        link: '#',
        alt: 'location',
    },
    socialIcons: [
        {
            alt: 'facebook',
            src: FacebookIcon,
            link: 'https://facebook.com'
        },
        {
            alt: 'instagram',
            src: InstagramIcon,
            link: 'https://instagram.com'
        },
        {
            alt: 'twitter',
            src: TwitterIcon,
            link: 'https://twitter.com'
        },
        {
            alt: 'linkedin',
            src: LinkedInIcon,
            link: 'https://linkedin.com'
        },
        {
            alt: 'youtube',
            src: YoutubeIcon,
            link: 'https://youtube.com'
        }
    ],
    mobileApps: {
        google: {
            alt: 'Download Android App',
            src: PlayStore,
            link: '#'
        },
        apple: {
            alt: 'Download IOS App',
            src: AppleStore,
            link: '#'
        }
    }
}

export { logo, footerIcons }