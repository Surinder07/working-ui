import { useState } from 'react';
import { FilterModal } from '../base';
import { DashboardModalStyles } from '../../../styles/elements';
import { EditableInput } from '../../inputComponents';
import { timesheetType } from '../../../constants';

const TimesheetFilter = (props) => {

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [type, setType] = useState('');
    const [errorDate, setErrorDate] = useState({
        message: '',
        show: false
    });

    const clearAllFilter = () => {
        setStartDate('')
        setEndDate('')
        setType('')
        setErrorDate({
            message: '',
            show: false
        })
        props.setFilters({})
    }

    const isError = () => {
        if ((startDate === '' && endDate !== '') || (startDate !== '' && endDate === '')) {
            setErrorDate({
                message: 'Both dates are required',
                show: true
            })
            return true;
        }
    }

    const applyFilter = () => {
        if (!isError()) {
            props.setFilters({ ...props.filters, startDate, endDate, type });
            return true;
        } else return false;
    }

    return (
        <div>
            <FilterModal
                showModal={props.showModal}
                setShowModal={props.setShowModal}
                buttonText='Apply Filter'
                title='Filter Options'
                type='twoColNarrow'
                onClick={applyFilter}
                clearAllFilter={clearAllFilter}
            >
                <h4 className={DashboardModalStyles.singleColumn} style={{ width: '100%', textAlign: 'center', margin: 0, color: '#535255' }}>Clock In Date</h4>
                <EditableInput
                    type='date'
                    label='From'
                    value={startDate}
                    setValue={setStartDate}
                    error={errorDate}
                    setError={setErrorDate}
                    editOn
                />
                <EditableInput
                    type='date'
                    label='To'
                    value={endDate}
                    setValue={setEndDate}
                    error={errorDate}
                    setError={setErrorDate}
                    editOn
                />
                <EditableInput
                    type='dropdown'
                    label='Entry Type'
                    placeholder='Entry Type'
                    value={type}
                    setValue={setType}
                    options={timesheetType}
                    className={DashboardModalStyles.singleColumn}
                    editOn
                />
            </FilterModal>
        </div>
    );
};

export default TimesheetFilter;
