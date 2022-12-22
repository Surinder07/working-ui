import React, { useEffect, useState } from "react";
import { DashboardStyles } from "../../../styles/pages";
import { WaawNoIndexHead, Button, DashboardCard, TabularInfo, LocationModal, DeleteModal } from "../../../components";
import { locationAndRoleService } from "../../../services";
import { PaginationDropdown } from "../../../components";

const Locations = (props) => {

    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState();
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalEntries, setTotalEntries] = useState(0);
    const [reloadData, setReloadData] = useState(false);
    const [confirmDeleteModal, setConfirmDeleteModal] = useState({
        id: '',
        show: false
    })

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: "dashboard",
            activeMenu: "LOCATIONS",
            activeSubMenu: "none",
        });
        props.setAllowedRoles(['ADMIN'])
    }, []);

    useEffect(() => {
        fetchData();
    }, [pageNo, pageSize]);

    useEffect(() => {
        if (reloadData) fetchData();
        setReloadData(false);
    }, [reloadData])

    const fetchData = () => {
        props.setPageLoading(true);
        locationAndRoleService.getAllLocations(pageNo, pageSize)
            .then(res => {
                if (res.error) {
                    props.setToasterInfo({
                        error: true,
                        title: "Error!",
                        message: res.message,
                    })
                } else {
                    setData(res.data.map(loc => {
                        return {
                            internalId: loc.id,
                            id: loc.waawId,
                            locationName: loc.name,
                            creationDate: loc.creationDate,
                            timezone: loc.timezone,
                            activeEmployees: loc.activeEmployees + '',
                            inactiveEmployees: loc.inactiveEmployees + '',
                            status: {
                                text: loc.active ? 'ACTIVE' : 'DISABLED',
                                displayType: 'bg',
                                status: loc.active ? 'ok' : 'bad'
                            }
                        }
                    }));
                    setTotalEntries(res.totalEntries);
                    setTotalPages(res.totalPages);
                }
                props.setPageLoading(false);
            })
    }

    const handleResponse = (apiResponse, successMessage) => {
        if (apiResponse.error) {
            props.setToasterInfo({
                error: true,
                title: "Error!",
                message: apiResponse.message,
            })
        } else {
            props.setToasterInfo({
                error: false,
                title: "Success!",
                message: successMessage,
            })
            setReloadData(true);
        }
    }

    const deleteLocation = () => {
        props.setPageLoading(true);
        locationAndRoleService.removeLocation(confirmDeleteModal.id)
            .then(res => {
                handleResponse(res, "Location Deleted Successfully")
            })
        props.setPageLoading(false);
    }

    const actions = [
        {
            key: "activeToggle",
            action: (id) => {
                props.setPageLoading(true);
                locationAndRoleService.toggleActiveLocation(id)
                    .then(res => {
                        handleResponse(res, "Location updated Successfully")
                    });
                props.setPageLoading(false);
            },
        },
        {
            key: "Delete",
            action: (id) => setConfirmDeleteModal({ id: id, show: true }),
        },
    ];

    return (
        <>
            <WaawNoIndexHead title='Locations' />
            <DeleteModal
                modal={confirmDeleteModal}
                setModal={setConfirmDeleteModal}
                onDelete={deleteLocation}
            />
            <LocationModal
                showModal={showModal}
                setShowModal={setShowModal}
                setToasterInfo={props.setToasterInfo}
                setReloadData={setReloadData}
                role={props.user.role}
            />
            <div className={DashboardStyles.dashboardTitles}>
                <h1>Locations</h1>
                <div className={DashboardStyles.rightContainer}>
                    <PaginationDropdown value={pageSize} setValue={setPageSize} rightSpace />
                    <Button type='plain' onClick={() => setShowModal(true)}>+ Add new Location</Button>
                </div>
            </div>
            <DashboardCard style={{ marginTop: '20px' }}>
                <TabularInfo
                    title='Location Listing'
                    description='Tabular list of all locations.'
                    data={data}
                    pagination
                    actions={actions}
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

export default Locations;