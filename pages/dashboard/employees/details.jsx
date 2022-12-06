import { useEffect, useState } from "react";
import styles from "../../../styles/pages/Dashboard.module.css";
import WaawHead from "../../../components/WaawHead";
import UserPreferenceCard from '../../../components/dashboardComponents/userPreferences/UserPreferenceCard';
import InputBox from "../../../components/inputComponents/InputBox";
import DropDown from "../../../components/inputComponents/DropDown";
import ContactInput from "../../../components/inputComponents/ContactInput";
import Link from 'next/link';
import TabularInfo from "../../../components/dashboardComponents/TabularInfo";
import DashboardCard from "../../../components/dashboardComponents/DashboardCard";
import SmallModal from "../../../components/modals/SmallModal";

const Employees = (props) => {
    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: "dashboard",
            activeMenu: "EMPLOYEES",
            activeSubMenu: "none",
        });
    }, []);

    const [mobile, setMobile] = useState({
        countryCode: '',
        mobile: '',
        country: ''
    })
    const [expandedMenu, setExpandedMenu] = useState('none');
    const [showModal,setShowModal] = useState(true)

    const handleExpansion = (clickedMenu) => {
        if(clickedMenu === expandedMenu) {
            setExpandedMenu('none');
        } else {
            setExpandedMenu(clickedMenu);
        }
    }

    const getExpandableData = (title) => {
        return <DashboardCard style={{ marginTop: '20px' }}>
            <TabularInfo
                data={[
                    {
                        'Location Id' : '6476475',
                        'Location Name': 'Canada',
                        'Creation Date': '01/01/2023',
                        'Timezone': 'EST',
                        'Number of active employees': '200',
                        'Number of inactive employees': '25',
                        status: 'xyz',
                        Actions: 'not added'
                    },
                    {
                        'Location Id': '6476475',
                        'Location Name': 'India',
                        'Creation Date': '02/01/2023',
                        'Timezone': 'IST',
                        'Number of active employees': '200',
                        'Number of inactive employees': '25',
                        status: 'xyz',
                        Actions: 'not added'
                    },
                    {
                        'Location Id': '6476475',
                        'Location Name': 'Australia',
                        'Creation Date': '03/01/2023',
                        'Timezone': 'EST',
                        'Number of active employees': '200',
                        'Number of inactive employees': '25',
                        status: 'xyz',
                        Actions: 'not added'
                    }
                ]}
                title={title}
                expanded={expandedMenu === title.toLowerCase()}
                toggleExpansion={() => handleExpansion(title.toLowerCase())}
                expandable
                pagination
                showSearch
                showFilter
            />
        </DashboardCard>
    }

    return (
        <>
            <WaawHead title={"WaaW | Employee Details"} />
            <SmallModal showModal={showModal} setShowModal={setShowModal}/>
            <div className={styles.dashboardTitles}>
                <h1><Link href='/dashboard/employees' style={{ color: '#535255' }}>Employees</Link>{` > Employee Details`}</h1>
            </div>
            {/* Employee Personal Details */}
            <UserPreferenceCard
                title='Personal Details'
                isEditable
                editOn={false}
            // setEditOn={setEditPersonalDetails}
            >
                <InputBox label='FirstName' type='user' name='name' inputType={2} />
                <DropDown options={['test', 'test']} inputType={2} />
                <ContactInput setValue={setMobile} value={mobile} inputType={2} />
            </UserPreferenceCard>
            {getExpandableData('Preference')}
            {getExpandableData('Shifts')}
            {getExpandableData('Requests')}
            {getExpandableData('Attendance')}
        </>
    );
};

export default Employees;
