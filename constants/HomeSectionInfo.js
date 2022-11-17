import TileIcons from '../public/icons/homeGridIcons/TileIcons';

export const business = {
    title: 'FOR BUSINESS COMMUNITY',
    description: 'Manage your business and find workforce full time/hourly anytime anywhere',
    tiles: [
        {
            icon: TileIcons.Icon1,
            text: 'Manage Your Business',
            link: ''
        },
        {
            icon: TileIcons.Icon2,
            text: 'Post A Full Time Opportunity',
            link: ''
        },
        {
            icon: TileIcons.Icon3,
            text: 'Post A Half Time Opportunity',
            link: ''
        },
        {
            icon: TileIcons.Icon4,
            text: 'Post A Project',
            link: ''
        }
    ],
    styles: {
        image: {
            backgroundImage: `url('/bg/business-bg.png')`,
            backgroundPosition: 'var(--business-bg-position)'
        },
        color: {
            background: 'rgb(221,222,225)',
            background: 'var(--business-bg-gradient)'
        },
        text: {
            color: '#000'
        },
        overlay: {
            backgroundColor: '#FFFFFF50'
        }
    }
}

export const talent = {
    title: 'FOR TALENT COMMUNITY',
    description: 'Find great work you are passionate about and earn on your own terms anytime anywhere',
    tiles: [
        {
            icon: TileIcons.Icon5,
            text: 'Create Your Talent',
            link: ''
        },
        {
            icon: TileIcons.Icon2,
            text: 'Find A Full Time Opportunity',
            link: ''
        },
        {
            icon: TileIcons.Icon3,
            text: 'Find A Half Time Opportunity',
            link: ''
        },
        {
            icon: TileIcons.Icon6,
            text: 'Find A Project',
            link: ''
        }
    ],
    styles: {
        image: {
            backgroundImage: `url('/bg/talent-bg.png')`,
            backgroundPosition: 'var(--talent-bg-position)'
        },
        color: {
            background: 'rgb(64,164,212)',
            background: 'var(--talent-bg-gradient)'
        },
        text: {
            color: '#FFF'
        },
        overlay: {
            backgroundColor: '#FFFFFF00'
        }
    }
}