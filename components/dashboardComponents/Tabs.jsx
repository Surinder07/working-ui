import { TabsStyles } from "../../styles/elements";

const Tabs = (props) => {
    return (
        <>
        {props.title && <p className={TabsStyles.title}>{props.title}</p>}
        <div className={`${props.size === 'small' ? TabsStyles.containerSmall : TabsStyles.containerBig} ${props.className}`}>
            <div className={`${TabsStyles.option} ${props.options[0] === props.selected && TabsStyles.selected}`}
                onClick={() => props.setSelected(props.options[0])}
            >
                {props.options[0]}
            </div>
            <div className={`${TabsStyles.option} ${props.options[1] === props.selected && TabsStyles.selected}`}
                onClick={() => props.setSelected(props.options[1])}
            >
                {props.options[1]}
            </div>
        </div>
        </>
    );
}

export default Tabs;