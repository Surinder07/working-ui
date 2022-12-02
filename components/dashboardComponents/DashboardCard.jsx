import styles from '../../styles/pages/Dashboard.module.css';

const DashboardCard = (props) => {
    return (
        <div className={`${styles.card} ${props.className}`} style={props.style}>
            {
                props.showOptions &&
                <div className={styles.options}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            }
            {props.children}
        </div>
    )
}

export default DashboardCard;