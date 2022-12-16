import { DashboardStyles } from '../../styles/pages';
import Options from './Options';

const DashboardCard = (props) => {
    return (
        <div className={`${DashboardStyles.card} ${props.className}`} style={props.style}>
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
                ]} />
            }
            {props.children}
        </div>
    )
}

export default DashboardCard;