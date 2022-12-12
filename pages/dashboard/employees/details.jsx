import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { DashboardStyles } from "../../../styles/pages";
import Link from 'next/link';
import stylesModal from "../../../styles/elements/Modal.module.css";
import {
    WaawNoIndexHead,
    UserPreferenceCard,
    InputBox,
    DropDown,
    ContactInput,
    TabularInfo,
    DashboardCard,
    Modal,
    ProfileImage,
    EditableInput
} from "../../../components";

const Employees = (props) => {

    const router = useRouter();

    const [userId, setUserId] = useState('');
    const [mobile, setMobile] = useState({
        countryCode: '',
        mobile: '',
        country: ''
    })
    const [expandedMenu, setExpandedMenu] = useState('none');
    const [editOn, setEditOn] = useState(false);
    const [showModal, setShowModal] = useState(true)
    const buttonText = ["Continue", "Cancel"];

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: "dashboard",
            activeMenu: "EMPLOYEES",
            activeSubMenu: "none",
        });
    }, []);

    useEffect(() => {
        if (!router.isReady) return;
        if (router.query.key)
            setUserId(router.query.id);
    }, [router.isReady, router.query]);

    const options = [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];

    const actions = {
        key: "Edit",
        action: () => console.log("Edit table data here in /dashboard/employees/details"),
    }

    const handleExpansion = (clickedMenu) => {
        if (clickedMenu === expandedMenu) {
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
                        locationId: '6476475',
                        locationName: 'Canada',
                        creationDate: '01/01/2023',
                        timezone: 'EST',
                        numberOfActiveEmployees: '200',
                        numberOfInactiveEmployees: '25',
                        status: 'xyz',
                    },
                    {
                        locationId: '6476475',
                        locationName: 'Canada',
                        creationDate: '01/01/2023',
                        timezone: 'EST',
                        numberOfActiveEmployees: '200',
                        numberOfInactiveEmployees: '25',
                        status: 'xyz',
                    },
                    {
                        locationId: '6476475',
                        locationName: 'Canada',
                        creationDate: '01/01/2023',
                        timezone: 'EST',
                        numberOfActiveEmployees: '200',
                        numberOfInactiveEmployees: '25',
                        status: 'xyz',
                    }
                ]}
                title={title}
                expanded={expandedMenu === title.toLowerCase()}
                toggleExpansion={() => handleExpansion(title.toLowerCase())}
                expandable
                actions={actions}
                pagination
                showSearch
                showFilter
            />
        </DashboardCard>
    }

    return (
        <>
            <WaawNoIndexHead title="Employee Details" />
            <div className={DashboardStyles.dashboardTitles}>
                <h1><Link href='/dashboard/employees' style={{ color: '#535255' }}>Employees</Link>{` > Employee Details`}</h1>
            </div>
            {/* Employee Personal Details */}
            <UserPreferenceCard
                title='Personal Details'
                isEditable
                editOn={editOn}
                setEditOn={setEditOn}
            >
                <div className={DashboardStyles.personalContainer}>
                    <ProfileImage size='big' />
                    <div className={DashboardStyles.personalContent}>
                        <EditableInput label='First Name' type='text' editOn />
                        <EditableInput label='Last Name' type='text' editOn />
                        <EditableInput label='Mobile' type='mobile' value={mobile} setValue={setMobile} editOn />
                        <EditableInput label='Email' type='text' editOn />
                        <EditableInput label='Employee Id' type='text' editOn />
                        <EditableInput label='Location' type='text' editOn />
                        <EditableInput label='Role' type='text' editOn />
                        <EditableInput label='Employee type' type='text' editOn />
                    </div>
                </div>
            </UserPreferenceCard>
            {getExpandableData('Preference')}
            {getExpandableData('Shifts')}
            {getExpandableData('Requests')}
            {getExpandableData('Attendance')}

            <Modal
                size="small"
                showModal={showModal}
                setShowModal={setShowModal}
                buttonText={buttonText}
            >
                <div className={stylesModal.smallModalMainContainer}>
                    <div className={stylesModal.smallModalUpperdiv}>
                        <div>
                            <p>In Time</p>
                            <span
                                style={{ display: "flex" }}
                                className={stylesModal.modalDropDown}
                            >
                                <DropDown inputType={2} defaultDisplay={options[0]} options={options} />
                                <DropDown inputType={2} defaultDisplay={options[0]} options={options} />
                            </span>
                        </div>
                        <div>
                            <p>Out Time</p>
                            <span
                                style={{ display: "flex" }}
                                className={stylesModal.modalDropDown}
                            >
                                <DropDown inputType={2} defaultDisplay={options[0]} options={options} />
                                <DropDown inputType={2} defaultDisplay={options[4]} options={options} />
                            </span>
                        </div>
                    </div>

                    <div className={stylesModal.smallModalUpperdiv}>
                        <div>
                            <p>In Date</p>
                            <input type="date" />
                        </div>
                        <div>
                            <p>Out Date</p>
                            <input type="date" />
                        </div>
                    </div>
                </div>
                <label>Comment</label>
                <textarea className={stylesModal.smallModalTextarea} required></textarea>
            </Modal>
        </>
    );
};

export default Employees;
