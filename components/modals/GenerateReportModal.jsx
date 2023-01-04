import React, { useEffect } from "react";
import { useState } from "react";
import { EditableInput } from "../inputComponents";
import { DashboardModal } from "./base";
import { DashboardModalStyles } from "../../styles/elements";
import { dropdownService } from "../../services";
import { fetchAndHandle, validateForEmptyField } from "../../helpers";
import { ReportType } from "../../constants";


const GenerateReportsModal = (props) => {
    const [locations, setLocations] = useState([])
    const [fromValue, setFromValue] = useState("");
    const [tillValue, setTillValue] = useState("")
    const [location, setLocation] = useState("")
    const [reportType, setReportType] = useState("")


    const [locationError, setLocationError] = useState({
        message: "",
        show: false
    })
    const [reportTypeError,setReportTypeError] = useState({})

    const [loading, setLoading] = useState({});

    useEffect(() => {
        props.setData&& props.setData({
            fromDate:fromValue,
            tillDate:tillValue,
            location:location,
            reportType:reportType
         })
       },[])

    const onCancel = () => {
        setFromValue("")
        setTillValue("")
        setLocation("")
        setReportTypeError({})
        setLocationError({})
    }

    useEffect(() => {
        if (props.role === 'ADMIN') {
            dropdownService.getLocations()
                .then(res => {
                    if (!res.error) {
                        setLocations(res);
                    }
                })
        }
    }, [])

    useEffect(() => {
        props.setData && props.setData({
            fromDate: fromValue,
            tillDate: tillValue,
            location,
            reportType
        })
    },[])

    const isError = () => {
        return validateForEmptyField(location, 'Location', setLocationError, props.role === 'ADMIN')
    }

    const saveData = () => {
                if (!isError()) {
                    fetchAndHandle(setLoading,props.setReloadData,props.setPageLoading,onCancel,props.setShowModal,props.setToasterInfo)
                    // setLoading(true)
                    //     props.setToasterInfo({
                    //         error: true,
                    //         title: 'Error!',
                    //         message: res.message
                    //     })
                    // }
                    // else {
                    //     props.setToasterInfo({
                    //         error: false,
                    //         title: 'Success!',
                    //         message: 'Report Generated successfully'
                    //     });
                    //     props.setReloadData(true)
                    //     onCancel()
                    // setLoading(false)
                    }
                }
            

    return (
        <DashboardModal
            showModal={props.showModal}
            setShowModal={props.setShowModal}
            buttonText="Submit"
            title="Generate Reports"
            type="twoColNarrow"
            onClick={saveData}
            onCancel={onCancel}
            loading={loading}
        >
            <EditableInput type="date" value={fromValue} setValue={setFromValue} initialValue={fromValue} label="From" editOn />
            <EditableInput type="date" value={tillValue} setValue={setTillValue} initialValue={tillValue} label="Till" editOn />
            {props.role === 'ADMIN' &&
                <EditableInput
                    type="dropdown"
                    options={["India", "Canada", "Germany"]}
                    label="Location"
                    placeholder="Location"
                    className={DashboardModalStyles.singleColumn}
                    value={location}
                    setValue={setLocation}
                    initialValue={location}
                    error={locationError}
                    setError={setLocationError}
                    editOn
                />
            }
             <EditableInput 
            type="dropdown"
            options={ReportType}
            label="Report Type"
            placeholder="Report Type"
            className={DashboardModalStyles.singleColumn}
            value={reportType}
            setValue={setReportType}
            initialValue={reportType}
            error={reportTypeError}
            setError={setReportTypeError}
            editOn
            />
            
        </DashboardModal>
    );
};

export default GenerateReportsModal;