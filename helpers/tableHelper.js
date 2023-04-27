import { Edit, Delete, FileDownload } from "@mui/icons-material";
import { Options } from "../components";
import { TableStyles } from "../styles/elements";

export const getColorByStatus = (status) => {
    switch (status) {
        case "ok":
            return "#2996C3";
        case 'warn':
            return '#E4BE3D';
        case "basic":
            return "#535255";
        case 'bad':
            return '#CC5252';
        default:
            return '#FFFFFF';
    }
}

export const checkAllowedDataIndex = (i, screenType) => {
    if (screenType === 1) return true;
    else if (screenType === 2 && i <= 3) return true;
    else if (screenType === 3 && i <= 1) return true;
    else return false;
}

export const getAction = (id, status, date, actions, style, vertical) => {
    if (!style) style = {};
    if (Array.isArray(actions)) return <Options style={style} options={actions} actionId={id} status={status} date={date} vertical={vertical} />;
    else if (actions.key === "Edit") return <Edit style={{ ...style, color: '#0091d0' }} className={TableStyles.actionIcon} onClick={() => actions.action(id)} />;
    else if (actions.key === "Delete") return <Delete style={{ ...style, color: "#CC1111" }} className={TableStyles.actionIcon} onClick={() => actions.action(id)} />;
    else if (actions.key === "Download") return <FileDownload style={{ ...style, color: '#0091d0' }} className={TableStyles.actionIcon} onClick={() => actions.action(id)} />;
};