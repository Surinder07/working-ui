import { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";
import TabularInfo from "./TabularInfo";
import { TableStyles } from "../../styles/elements";
import { EditableInput } from "../inputComponents";
import { currencies } from "../../constants";

const EmployeePreference = (props) => {

    const [editOn, setEditOn] = useState(false);
    const [initialPreferences, setInitialPreferences] = useState({});
    const [preferences, setPreferences] = useState({});

    const getDayObject = (day, startTime, endTime) => {
        return {
            days: day,
            working: startTime !== null,
            startTime: {
                hours: startTime ? startTime.split(':')[0] : null,
                minutes: startTime ? startTime.split(':')[1] : null
            },
            endTime: {
                hours: endTime ? endTime.split(':')[0] : null,
                minutes: endTime ? endTime.split(':')[1] : null
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

    useEffect(() => {
        console.log(preferences)
    }, [preferences])

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

    useEffect(() => {
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