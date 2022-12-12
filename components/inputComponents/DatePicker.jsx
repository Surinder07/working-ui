import styles from '../../styles/elements/inputs/DatePicker.module.css';

const DatePicker = (props) => {
    return(<div className={styles.container}> <input type="date" id="datepicker" autocomplete="off"></input></div>)
}

export default DatePicker;