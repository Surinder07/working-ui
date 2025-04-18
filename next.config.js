/** @type {import('next').NextConfig} */

const apiEndpoints = {
    user: {
        authorization: "/v1/unAuth/authenticate",
        registerNewUser: "/v1/unAuth/user/registration/new",
        verifyEmail: "/v1/unAuth/user/registration/verifyEmail",
        completeProfile: "/v1/user/registration/completeProfile",
        completePaymentInfo: '/v1/user/registration/completePaymentInfo',
        validateInviteKey: "/v1/unAuth/user/invitation/validateKey",
        registerByInvite: "/v1/unAuth/user/invitation/register",
        getUserDetails: "/v1/user/getAccount",
        resetPasswordInit: "/v1/unAuth/user/resetPassword/init",
        resetPasswordFinish: "/v1/unAuth/user/resetPassword/finish",
        validatePromoCode: '/v1/registration/user/validatePromoCode',
        updateProfileImage: '/v1/user/updateProfileImage',
        updateUser: '/v1/user/update',
        updateEmailInit: '/v1/user/email/update',
        updateEmailFinish: '/v1/unAuth/user/email/verify'
    },
    member: {
        sendInvite: '/v1/member/invite/send',
        resendInvite: '/v1/member/invite/resend',
        sendInviteByUpload: '/v1/member/invite/upload',
        getAllMembers: '/v1/member/getAll',
        getMemberById: '/v1/member/getById',
        updateMember: '/v1/member/update',
        deleteMember: '/v1/member/delete',
        toggleActiveMember: '/v1/member/toggleActive',
        addEmployeePreferences: '/v1/member/addPreference'
    },
    locationAndRole: {
        newLocation: "/v1/location/save",
        getLocation: "/v1/location/get",
        deleteLocation: "/v1/location/delete",
        toggleActiveLocation: "/v1/location/toggleActive",
        getLocationRole: "/v1/location/role/get",
        newLocationRole: "/v1/location/role/save",
        deleteLocationRole: "/v1/location/role/delete",
        updateLocationRole: "/v1/location/role/update",
        toggleActiveLocationRole: "/v1/location/role/toggleActive",
    },
    shifts: {
        createShift: '/v1/shifts/create',
        updateShift: '/v1/shifts/update',
        deleteShift: '/v1/shifts/delete',
        deleteBatch: '/v1/shifts/batch/delete',
        assignShift: '/v1/shifts/assign',
        releaseShift: '/v1/shifts/release',
        editShift: '/v1/shifts/edit',
        releaseBatch: '/v1/shifts/batch/release',
        getAllShifts: '/v1/shifts/getAll',
        getAllShiftsUser: '/v1/shifts/user/getAll',
        getById: '/v1/shifts/get'
    },
    requests: {
        newRequest: '/v1/requests/new',
        updateRequest: '/v1/requests/update',
        getAll: '/v1/requests/getAll',
        getMyRequests: '/v1/requests/getByUser'
    },
    notification: {
        getAllNotification: '/v1/notifications/getAll',
        markNotificationAsRead: '/v1/notifications/markAsRead',
        markAllNotificationAsRead: '/v1/notifications/markAllAsRead',
        deleteNotification: '/v1/notifications/delete'
    },
    dropdown: {
        getTimezones: "/v1/unAuth/dropdown/timezones",
        getLocations: "/v1/dropdown/locations",
        getRoles: "/v1/dropdown/roles",
        getUsers: "/v1/dropdown/users",
    },
    dashboard: {
        getData: "/v1/dashboard/getData",
        getShiftData: '/v1/dashboard/getData/shift'
    },
    resources: {
        fileTemplate: "/v1/unAuth/resource/downloadFile"
    },
    timesheet: {
        startTimer: '/v1/timesheet/timer/start',
        stopTimer: '/v1/timesheet/timer/stop',
        getTimer: '/v1/timesheet/timer/get',
        getAll: '/v1/timesheet/getAll',
        getById: '/v1/timesheet/get',
        add: '/v1/timesheet/add',
        edit: '/v1/timesheet/edit',
        delete: '/v1/timesheet/delete'
    },
    organization: {
        updateOrganizationPreferences: '/v1/organization/update',
        uploadLogo: '/v1/organizagion/logo/upload',
        getHolidays: '/v1/organization/holiday/getAll',
        addHolidaysExcel: '/v1/organization/holiday/upload',
        addHoliday: '/v1/organization/holiday/add',
        editHoliday: '/v1/organization/holiday/edit',
        deleteHoliday: '/v1/organization/holiday/delete'
    },
    calender: {
        getTimesheet: '/v1/calender/timesheets/get',
        getDayEvents: '/v1/calender/events/get'
    },
    reports: {
        get: '/v1/reports/get',
        generate: '/v1/reports/generate',
        download: '/v1/reports/download'
    },
    openApis: {
        subscribe: '/v1/unAuth/open/subscribe'
    },
    paymentApis: {
        createSetupIntent: '/v1/payment/setupIntent/create',
        addNewCard: '/v1/payment/card/add',
        updateDefaultCard: '/v1/payment/card/updateDefault',
        deleteCard: '/v1/payment/card/delete',
        getAllCards: '/v1/payment/card/getAll',
        createPaymentIntent: '/v1/payment/paymentIntent/create',
        getAllPayments: '/v1/payment/history/get',
        getPaymentById: '/v1/payment/history/get',
        confirmPayment: '/v1/payment/confirm',
        getPendingPayment: '/v1/payment/pending/get'
    },
    webSocket: {
        endpoint: '/ws-connect',
        topics: {
            notification: '/user/ws-server/notification',
            shift: '/user/ws-server/shift',
            timesheet: '/user/ws-server/timesheet',
            userInvite: '/user/ws-server/user-invite',
            holidayUpload: '/user/ws-server/holiday-upload',
            updateUserDetail: '/user/ws-server/update-user-detail'
        }
    }
};

const nextConfig = {
    reactStrictMode: true,
    distDir: "./build",
    images: { unoptimized: true },
    eslint: { ignoreDuringBuilds: true },
    publicRuntimeConfig: {
        apiUrl: process.env.NODE_ENV === 'development'
            ? 'http://localhost:8080/api' // development api
            : 'https://staging-api.waaw.ca/api' // production api
    },
    env: {
        version: "2.0.8",
        termsAndPrivacyData: {
            deployedAddress: "www.waaw.ca",
            businessAddress: "25 Plentywood drive, Bramptom, Canada, L6Y 0V2",
            minAge: 18,
            customerSupport: "waaw.management@waaw.ca",
        },
        firebase: {
            apiKey: "",
            authDomain: "waaw-waitlist.firebaseapp.com",
            projectId: "waaw-waitlist",
            storageBucket: "waaw-waitlist.appspot.com",
            messagingSenderId: "213804837638",
            appId: "1:213804837638:web:074369716cbebca22b0c87",
            measurementId: "G-YXEDFG0Y60",
        },
        header: {
            title: "Automated Workforce Scheduling",
            description: "Automated Workforce Scheduling app created by WAAW to help people and business to grow and thrive together",
            aboutUsDescription: "WAAW Global inc is a software company that is started with a mission to help both business and talent community alike. It supports business of all sizes.",
            meta: {
                openGraph: {
                    // og:title and og:description are picked up from title and description itself
                    url: "https://waaw.ca/",
                    image: "https://waaw.ca/favicon.svg",
                    type: "website",
                },
                keywords: "shift scheduling, shifts, business management, find work, manage business, business app, freelance, hire help, hire workers",
                robots: "index, follow",
                copyright: "WAAW Global inc",
            },
        },
        endpoints: apiEndpoints,
        stripeKey: 'pk_test_51IuozbEkZ4NGJcE2neLnc10UFj4glIMdwljlunvPOyzo7u9YVTs4faJO7MPwGTIQo5fKwWAeMiKwFSb3zLHIfqQb00d2oDYr0l'
    },
};

module.exports = nextConfig;
