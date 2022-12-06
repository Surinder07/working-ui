import styles from '../../styles/pages/Dashboard.module.css';
import Options from './Options';

const DashboardCard = (props) => {
    return (
        <div className={`${styles.card} ${props.className}`} style={props.style}>
            {
                props.showOptions &&
                <Options vertical options={[
                    {
                        key: 'Edit',
                        action: () => console.log('edit')
                    },
                    {
                        key: 'Delete',
                        action: () => console.log('delete')
                    }
                ]}/>
            }
            {props.children}
        </div>
    )
}

export default DashboardCard;