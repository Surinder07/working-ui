import { MobileModalStyles } from "../../../styles/elements";
import { ArrowBack, MoreVert } from "@mui/icons-material";

const MobileModal = (props) => {
    return (
        <div className={MobileModalStyles.container}>
            <ArrowBack className={MobileModalStyles.arrowBackIcon} />
            <div className={MobileModalStyles.header}>{props.header}</div>
            <div className={MobileModalStyles.actions}>
                <MoreVert className={MobileModalStyles.editIcon} />
            </div>
            <div className={MobileModalStyles.contentContainer}>
                {Object.entries(props.data).map((info, key) => {
                    let name = info[0].replace(/([A-Z])/g, " $1").trim();
                    name = name.charAt(0).toUpperCase() + name.split(1);
                    let value = info[1];
                    return (
                        <>
                            <div className={MobileModalStyles.key}>{name}</div>
                            <div className={MobileModalStyles.value}>{value}</div>
                        </>
                    );
                })}
            </div>
        </div>
    );
};

export default MobileModal;