import { useEffect, useState } from "react";
import { DashboardCard, TabularInfo, WaawNoIndexHead } from "../../../components";
import { DashboardStyles } from "../../../styles/pages";

const notifications =[
    {
        title: 'New Request',
        type: 'Request',
        date: '2022-02-21',
        status: {
            text: 'Read',
            color: '#02A799'
        },
        subData: [
            {
                summary: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
            }
        ]
    },
    {
        title: 'Upcoming Shift',
        type: 'Shift',
        date: '2022-02-22',
        status: {
            text: 'Unread',
            color: '#999999'
        },
        subData: [
            {
                summary: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
            }
        ]
    }
];

const actions = {
    key: 'Delete', 
    action: () => console.log('delete')
}

const Notifications = (props) => {
 const [data,setData] = useState(notifications)
    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: "dashboard",
            activeMenu: "NOTIFICATIIONS",
            activeSubMenu: "none",
        });
    }, []);

    return (
        <>
            <WaawNoIndexHead title='Notifications' />
            <div className={DashboardStyles.dashboardTitles}>
                <h1>Notifications</h1>
            </div>
            <DashboardCard style={{ marginTop: '20px' }}>
                <TabularInfo
                    title='Invoices'
                    description='Tabular list of all current invoices status.'
                    data={data}
                    actions={actions}
                    pagination
                />
            </DashboardCard>
        </>
    )

}

export default Notifications;