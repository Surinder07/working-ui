import { Email, Organization, Profile, Security, PaymentMethods } from "../components";

export const ProfileTabs = {
    admin: ['Profile', 'Organization', 'Email', 'Security', 'Payment Methods'],
    manager: ['Profile', 'Email', 'Security'],
    employee: ['Profile', 'Email', 'Security'],
    superAdmin: []
}

export const getProfileElement = (name, data, setData, loadFunction, toasterFunction) => {
    switch (name) {
        case 'Profile':
            return <Profile data={data} setData={setData} setLoading={loadFunction} setToaster={toasterFunction} />
        case 'Organization':
            return <Organization data={data} setData={setData} setLoading={loadFunction} setToaster={toasterFunction} />
        case 'Email':
            return <Email data={data} setData={setData} setLoading={loadFunction} setToaster={toasterFunction} />
        case 'Security':
            return <Security setLoading={loadFunction} setToaster={toasterFunction} />
        case 'Payment Methods':
            return <PaymentMethods setLoading={loadFunction} setToaster={toasterFunction} />
    }
}