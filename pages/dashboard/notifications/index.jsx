import { useEffect, useState } from "react";
import { DashboardCard, TabularInfo, WaawNoIndexHead } from "../../../components";
import { DashboardStyles } from "../../../styles/pages";

const notifications = [
    {
        title: 'New Request',
        type: 'Request',
        date: '2022-02-21',
        status: {
            text: 'Read',
            status: 'ok',
            displayType: 'color'
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
            status: 'warn',
            displayType: 'color'
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

    const [data, setData] = useState(notifications);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalEntries, setTotalEntries] = useState(0);
    const [reloadData, setReloadData] = useState(false);

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: "dashboard",
            activeMenu: "NOTIFICATIONS",
            activeSubMenu: "none",
        });
    }, []);

    return (
        <>
            <WaawNoIndexHead title='Notifications' />
            <div className={DashboardStyles.dashboardTitles}>
                <h1>Notifications</h1>
                <p style={{ fontSize: '12px', cursor: 'pointer', color: '#2996C3', margin: 0 }}>
                    Mark all as Read
                </p>
            </div>
            <DashboardCard style={{ marginTop: '20px' }}>
                <TabularInfo
                    title='Notifications'
                    description='Tabular list of all your notifications.'
                    data={data}
                    actions={actions}
                    pagination
                    totalEntries={totalEntries}
                    pageSize={pageSize}
                    totalPages={totalPages}
                    pageNo={pageNo}
                    setPageNo={setPageNo}
                    showSearch
                    showFilter
                />
            </DashboardCard>
        </>
    )

}

export default Notifications;