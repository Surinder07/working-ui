import Images from '../../public/Images';
import Icons from '../../public/icons/Icons';
import SocialIcons from '../../public/icons/socials/SocialIcons';
import MobileAppIcons from '../../public/icons/mobileApps/MobileAppIcons';

export const ImagesInfo = {
    logo: {
        src: Images.Logo,
        link: '/',
        alt: 'logo',
        // Destkop Size: 1, Tab Size: 2, Mobile Size: 3
        headerHeight: { 1: 50, 2: 45, 3: 40 },
        footerHeight: { 1: 50, 2: 45, 3: 50 }
    },
    footerIcons: {
        // Destkop Size: 1, Tab Size: 2, Mobile Size: 3
        height: { 1: 25, 2: 20, 3: 20 },
        language: {
            src: Icons.GlobeIcon,
            link: '#',
            alt: 'language'
        },
        location: {
            src: Icons.LocationIcon,
            link: '#',
            alt: 'location',
        },
        socialIcons: [
            {
                alt: 'facebook',
                src: SocialIcons.FacebookIcon,
                link: 'https://facebook.com'
            },
            {
                alt: 'instagram',
                src: SocialIcons.InstagramIcon,
                link: 'https://instagram.com'
            },
            {
                alt: 'twitter',
                src: SocialIcons.TwitterIcon,
                link: 'https://twitter.com'
            },
            {
                alt: 'linkedin',
                src: SocialIcons.LinkedInIcon,
                link: 'https://linkedin.com'
            },
            {
                alt: 'youtube',
                src: SocialIcons.YoutubeIcon,
                link: 'https://youtube.com'
            }
        ],
        mobileApps: {
            // Destkop Size: 1, Tab Size: 2, Mobile Size: 3
            height: { 1: 30, 2: 25, 3: 20 },
            google: {
                alt: 'Download Android App',
                src: MobileAppIcons.PlayStore,
                link: '#'
            },
            apple: {
                alt: 'Download IOS App',
                src: MobileAppIcons.AppleStore,
                link: '#'
            }
        }
    }
}