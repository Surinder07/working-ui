import { Email, Organization, Profile, Security, PaymentMethods } from "../components";

export const ProfileTabs = {
    admin: ['Profile', 'Organization', 'Email', 'Security', 'Payment Methods'],
    manager: ['Profile', 'Email', 'Security'],
    employee: ['Profile', 'Email', 'Security'],
    superAdmin: []
}

export const getProfileElement = (name, data, setData) => {
    switch (name) {
        case 'Profile':
            return <Profile data={data} setData={setData} />
        case 'Organization':
            return <Organization data={data} setData={setData} />
        case 'Email':
            return <Email data={data} setData={setData} />
        case 'Security':
            return <Security />
        case 'Payment Methods':
            return <PaymentMethods />
    }
}