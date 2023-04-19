import { useEffect, useState } from "react";
import { fetchAndHandlePage, getSingleShiftsListing } from "../../helpers";
import { dashboardService } from "../../services";
import DashboardCard from "./DashboardCard";
import TabularInfo from "./TabularInfo";

const DashboardTabular = (props) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [data, setData] = useState();
    const [pageNo, setPageNo] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalEntries, setTotalEntries] = useState(0);

    useEffect(() => {
        fetchData();
    }, [pageNo]);

    const fetchData = () => {
        if (props.role === 'ADMIN') {
            setTitle('Payment History');
            setDescription('Tabular list of payment history');
            setData([]);
            // fetchAndHandlePage(() => notificationService.getAll(pageNo, 5, filters, sort),
            //     setData, setTotalEntries, setTotalPages, props.setPageLoading, props.setToasterInfo,
            //     getNotificationListing, props.user.role);
        } else if (props.role === 'MANAGER') {
            setTitle('Schedule shift for today');
            setDescription('Tabular list of all shifts assigned to employees for today');
            fetchAndHandlePage(() => dashboardService.getShiftData(pageNo, 5), setData, setTotalEntries,
                setTotalPages, null, null, getSingleShiftsListing, props.role);
        } else {
            setTitle('Upcoming scheduled shifts ');
            setDescription('Tabular list of all upcoming shifts');
            fetchAndHandlePage(() => dashboardService.getShiftData(pageNo, 5), setData, setTotalEntries,
                setTotalPages, null, null, getSingleShiftsListing, props.role);
        }
    }

    return (
        <DashboardCard style={{ marginTop: "20px" }}>
            <TabularInfo
                title={title}
                description={description}
                data={data}
                pagination
                totalEntries={totalEntries}
                pageSize={5}
                totalPages={totalPages}
                pageNo={pageNo}
                setPageNo={setPageNo}
                screenType={props.screenType}
            />
        </DashboardCard>
    )

}

export default DashboardTabular;