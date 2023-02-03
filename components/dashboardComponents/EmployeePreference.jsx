import { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";
import TabularInfo from "./TabularInfo";
import { TableStyles } from "../../styles/elements";
import { EditableInput } from "../inputComponents";
import { currencies } from "../../constants";
import { memberService } from "../../services";
import { fetchAndHandle, updatePreferenceRequestBody } from "../../helpers";
import { isAssetError } from "next/dist/client/route-loader";

const EmployeePreference = (props) => {

    const [editOn, setEditOn] = useState(false);
    const [initialPreferences, setInitialPreferences] = useState({});
    const [preferences, setPreferences] = useState({});
    const [loading, setLoading] = useState(false);

    const getDayObject = (day, startTime, endTime) => {
        return {
            days: day,
            working: startTime !== null,
            startTime: {
                hours: startTime ? startTime.split(':')[0] : '-',
                minutes: startTime ? startTime.split(':')[1] : '-'
            },
            endTime: {
                hours: endTime ? endTime.split(':')[0] : '-',
                minutes: endTime ? endTime.split(':')[1] : '-'
            }
        }
    }

    const getCellData = (child, i, j) => {
        return (
            <div className={TableStyles.bodyCell} key={`cell_${i}_${j}`}>
                {child}
            </div>
        )
    }

    const updatePreference = (value, type, index) => {
        const newObj = preferences.rowsData.map((preference, i) => {
            if (i === index) {
                switch (type) {
                    case 'working':
                        return { ...preference, working: value }
                    case 'startTime':
                        return { ...preference, startTime: value }
                    case 'endTime':
                        return { ...preference, endTime: value }
                }
            } else {
                return preference;
            }
        });
        setPreferences({ ...preferences, rowsData: newObj })
    }

    const onCancel = () => {
        setPreferences(initialPreferences);
    }

    const isError = () => {
        let error = false;
        preferences.rowsData.map(row => {
            if (row.working && (row.startTime.hours === '-' || row.startTime.minutes === '-' ||
                row.endTime.hours === '-' || row.endTime.minutes === '-')) error = true;
        })
        if (error) props.setToasterInfo({
            error: true,
            title: "Error!",
            message: "Please select a time for all working days",
        })
        return error;
    }

    const onSave = () => {
        if (loading) return;
        if (!isError()) {
            try {
                fetchAndHandle(() => memberService.addEmployeePreferences(updatePreferenceRequestBody(preferences, props.userId)),
                    "Preferences update successfuly", setLoading, props.setReloadData, props.setPageLoading,
                    null, null, props.setToasterInfo, () => setEditOn(false));
            } catch {
                setLoading(false)
            }
        }
    }

    useEffect(() => {
        if (props.data) {
            const preferenceObj = {
                rowsData: [
                    getDayObject('Sunday', props.data.sundayStartTime, props.data.sundayEndTime),
                    getDayObject('Monday', props.data.mondayStartTime, props.data.mondayEndTime),
                    getDayObject('Tuesday', props.data.tuesdayStartTime, props.data.tuesdayEndTime),
                    getDayObject('Wednesday', props.data.wednesdayStartTime, props.data.wednesdayEndTime),
                    getDayObject('Thursday', props.data.thursdayStartTime, props.data.thursdayEndTime),
                    getDayObject('Friday', props.data.fridayStartTime, props.data.fridayEndTime),
                    getDayObject('Saturday', props.data.saturdayStartTime, props.data.saturdayEndTime),
                ],
                wagesPerHour: props.data.wagesPerHour,
                wagesCurrency: props.data.wagesCurrency
            }
            setPreferences(preferenceObj);
            setInitialPreferences(preferenceObj);
        }
    }, [props.data])

    return (
        <DashboardCard style={{ marginTop: "20px" }}>
            <TabularInfo
                title='Preferences'
                expanded={props.expanded}
                toggleExpansion={props.toggleExpansion}
                expandable
                isEditable
                editOn={editOn}
                setEditOn={setEditOn}
                onSave={onSave}
                onCancel={onCancel}
            >
                {
                    preferences.rowsData ?
                        <>
                            <div className={TableStyles.table} style={{ gridTemplateColumns: `repeat(4, auto)` }}>
                                <div className={TableStyles.headerCell}>Days</div>
                                <div className={TableStyles.headerCell}>Working</div>
                                <div className={TableStyles.headerCell}>Start Time</div>
                                <div className={TableStyles.headerCell}>End Time</div>
                                {
                                    preferences.rowsData.map((row, i) => (
                                        <>
                                            {getCellData(row['days'], i, 1)}
                                            {
                                                getCellData(
                                                    <EditableInput type='toggle' editOn={editOn}
                                                        value={row['working']}
                                                        initialValue={initialPreferences.rowsData[i]['working']}
                                                        setValue={(value) => updatePreference(value, 'working', i)}
                                                    />, i, 2
                                                )
                                            }
                                            {
                                                getCellData(
                                                    <EditableInput
                                                        type='time'
                                                        editOn={editOn}
                                                        value={row['startTime']}
                                                        initialValue={initialPreferences.rowsData[i]['startTime']}
                                                        openUp={i === 6 || i === 5}
                                                        setValue={(value) => updatePreference(value, 'startTime', i)}
                                                    />, i, 3
                                                )
                                            }
                                            {
                                                getCellData(
                                                    <EditableInput
                                                        type='time'
                                                        editOn={editOn}
                                                        value={row['endTime']}
                                                        initialValue={initialPreferences.rowsData[i]['endTime']}
                                                        openUp={i === 6 || i === 5}
                                                        setValue={(value) => updatePreference(value, 'endTime', i)}
                                                    />, i, 4
                                                )
                                            }
                                        </>
                                    ))
                                }
                            </div>
                            <div className={TableStyles.employeePreferenceGrid}>
                                <EditableInput
                                    type='text'
                                    editOn={editOn}
                                    label='Wages (Per hour)'
                                    value={preferences.wagesPerHour}
                                    initialValue={initialPreferences.wagesPerHour}
                                    setValue={(val) => setPreferences({ ...preferences, wagesPerHour: val })}
                                />
                                <EditableInput
                                    openUp
                                    type='dropdown'
                                    editOn={editOn}
                                    options={currencies}
                                    label='Wages Currency'
                                    placeholder='Choose Currency'
                                    value={preferences.wagesCurrency}
                                    initialValue={initialPreferences.wagesCurrency}
                                    setValue={(val) => setPreferences({ ...preferences, wagesCurrency: val })}
                                />
                            </div>
                        </> :
                        <p>Loading Data...</p>
                }
            </TabularInfo>
        </DashboardCard>
    )
}

export default EmployeePreference;