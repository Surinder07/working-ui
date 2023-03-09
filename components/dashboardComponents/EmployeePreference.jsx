import { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";
import TabularInfo from "./TabularInfo";
import { TableStyles } from "../../styles/elements";
import { EditableInput } from "../inputComponents";
import { currencies } from "../../constants";
import { memberService } from "../../services";
import { fetchAndHandle, joinClasses, updatePreferenceRequestBody } from "../../helpers";

const EmployeePreference = (props) => {

    const [editOn, setEditOn] = useState(false);
    const [initialPreferences, setInitialPreferences] = useState({});
    const [preferences, setPreferences] = useState({});
    const [loading, setLoading] = useState(false);
    const [rowError, setRowError] = useState([]);

    const getDayObject = (day, startTime, endTime) => {
        return {
            days: day,
            working: startTime !== null && endTime !== null,
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

    const getCellData = (child, i, j, error) => {
        return (
            <div className={joinClasses(TableStyles.bodyCell, error && TableStyles.bodyCellError)} key={`cell_${i}_${j}`}>
                {child}
            </div>
        )
    }

    const updatePreference = (value, type, index) => {
        const indexToRemove = rowError.indexOf(index);
        rowError.splice(indexToRemove, 1);
        const newObj = preferences.rowsData.map((preference, i) => {
            if (i === index) {
                switch (type) {
                    case 'working':
                        return { ...preference, working: value }
                    case 'startTime':
                        if (value.hours !== '-' && value.minutes !== '-' &&
                            preference.endTime.hours !== '-' && preference.endTime.minutes !== '-') {
                            return { ...preference, startTime: value, working: true }
                        }
                        return { ...preference, startTime: value }
                    case 'endTime':
                        if (preference.startTime.hours !== '-' && preference.startTime.minutes !== '-' &&
                            value.hours !== '-' && value.minutes !== '-') {
                            return { ...preference, endTime: value, working: true }
                        }
                        return { ...preference, endTime: value }
                }
            } else {
                return preference;
            }
        });
        setPreferences({ ...preferences, rowsData: newObj })
    }

    useEffect(() => {
        console.log(preferences)
    }, [preferences])

    const onCancel = () => {
        setPreferences(initialPreferences);
        setRowError([])
    }

    const isError = () => {
        let error = false;
        let errors = [];
        preferences.rowsData.map((row, i) => {
            if ((row.working && (row.startTime.hours === '-' || row.startTime.minutes === '-' ||
                row.endTime.hours === '-' || row.endTime.minutes === '-')) || (!row.working && (
                    row.startTime.hours !== '-' || row.startTime.minutes !== '-' ||
                    row.endTime.hours !== '-' || row.endTime.minutes !== '-'))) {
                error = true;
                errors.push(i)
            }
        })
        setRowError(errors);
        if (error) props.setToasterInfo({
            error: true,
            title: "Error!",
            message: "Please select a time for all working days",
        })
        if (error) return error;
        error = (!preferences.wagesPerHour && preferences.wagesCurrency) ||
            (preferences.wagesPerHour && !preferences.wagesCurrency)
        if (error) props.setToasterInfo({
            error: true,
            title: "Error!",
            message: "Please provide both wages amount and currency",
        })
        return error
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

    const applyToAll = (data) => {
        const rowsData = [
            { days: 'Sunday', startTime: data.startTime, endTime: data.endTime, working: data.working },
            { days: 'Monday', startTime: data.startTime, endTime: data.endTime, working: data.working },
            { days: 'Tuesday', startTime: data.startTime, endTime: data.endTime, working: data.working },
            { days: 'Wednesday', startTime: data.startTime, endTime: data.endTime, working: data.working },
            { days: 'Thursday', startTime: data.startTime, endTime: data.endTime, working: data.working },
            { days: 'Friday', startTime: data.startTime, endTime: data.endTime, working: data.working },
            { days: 'Saturday', startTime: data.startTime, endTime: data.endTime, working: data.working }
        ]
        setPreferences({
            ...preferences,
            rowsData
        })
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
                    getDayObject('Saturday', props.data.saturdayStartTime, props.data.saturdayEndTime)
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
                            <div className={TableStyles.table} style={{ gridTemplateColumns: `repeat(${editOn ? '5' : '4'}, auto)` }}>
                                <div className={TableStyles.headerCell}>Days</div>
                                <div className={TableStyles.headerCell}>Working</div>
                                <div className={TableStyles.headerCell}>Start Time</div>
                                <div className={TableStyles.headerCell}>End Time</div>
                                {editOn && <div className={TableStyles.headerCell}>Actions</div>}
                                {
                                    preferences.rowsData.map((row, i) => (
                                        <>
                                            {getCellData(row['days'], i, 1, rowError.includes(i))}
                                            {
                                                getCellData(
                                                    <EditableInput type='toggle' editOn={editOn}
                                                        value={row['working']}
                                                        initialValue={initialPreferences.rowsData[i]['working']}
                                                        setValue={(value) => updatePreference(value, 'working', i)}
                                                    />, i, 2, rowError.includes(i)
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
                                                    />, i, 3, rowError.includes(i)
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
                                                    />, i, 4, rowError.includes(i)
                                                )
                                            }
                                            {
                                                editOn &&
                                                getCellData(
                                                    <p
                                                        className={TableStyles.applyText}
                                                        onClick={() => applyToAll(row)}
                                                    >Apply to all</p>,
                                                    i, 5, rowError.includes(i)
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