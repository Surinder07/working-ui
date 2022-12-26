import { PricingBusinessBg, PricingTalentBg } from '../public/images';

export const PricingInfo = {
    business: {
        title: 'Business Community Pricing',
        description: 'Manage your Business and find workforce full-time/hourly anytime anywhere. Our Platform allows you to effectively schedule eployees, track time across multiple locations, quickly find workforce for peak demands and communicae all in one place with premiun workfoce management tools.',
        background: PricingBusinessBg,
        features: [
            'Employe Shift Scheduling',
            'Flexible Shift Duration',
            'Automated Scheduling',
            'Absence Management',
            'Manage Multiple Locations',
            'Overtime Management',
            'Scheduling vs. Actual work hours reporting',
            'Timekeeping export for payroll integration',
            'Demand forecast',
            'Multiple Roles management',
            'Centralized Administrative Dashboard',
            'iOS and Android Availability'
        ],
        tables: [
            {
                title: 'Full Time & Part Time Employees',
                content: {
                    '# of Employees': 'Price/Employee/Month',
                    '1-20': '$20',
                    '21-50': '$18',
                    '51-100': '$15'
                }
            }
        ],
        extraDetails: [
            'One time setup fee will be $200 CDN',
            'For more than 100 employees, please contact us'
        ]
    },
    talent: {
        title: 'Talent Community Pricing',
        description: 'Find great work you are passionate about and earn on your own terms anytime anywhere. Our platform allows you to build strong relationships in your community and effectively search for Projects, Full time and Part time contracting opportunities with both small and large businesses.',
        background: PricingTalentBg,
        features: [
            'Profile creation with flexible shift duration',
            'Automatically matches opportunities based on your profile',
            'Apply for full time and part time contraction opportunities',
            'Bid for projects',
            'Receive notification on immediate shift request',
            'Efficient contracting terms',
            'Provide visibility of your schedule to multiple employers',
            'iOS & Android availability'
        ],
        tables: [
            {
                title: 'Full Time & Part Time Contracting',
                content: {
                    '#Hours/month': 'Fee/Hr',
                    '1-20': '$20',
                    '21-50': '$18',
                    '51-100': '$15'
                }
            },
            {
                title: 'Projects',
                content: {
                    'Project Cost': 'Platform Fee',
                    '$100-$1000': '$20',
                    '$1001-$5000': '$18',
                    '$5001-$10000': '$15',
                    '$10001-$50000': '$15',
                    '$50001 and above': '$15',
                }
            }
        ],
        extraDetails: [
            'One time setup fee will be $100 MN that will be paid after landing first contract/project'
        ]
    }
}