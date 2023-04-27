import { MobileModalStyles } from "../../../styles/elements";
import { ArrowBack } from "@mui/icons-material";
import SubTable from "./SubTable";
import { checkForTimeKey, getAction, getColorByStatus } from "../../../helpers";

const MobileModal = (props) => {

    return (
        props.showModal ?
            <div className={MobileModalStyles.container}>
                <div style={{ marginBottom: "20px" }}>
                    <ArrowBack
                        className={MobileModalStyles.arrowBackIcon}
                        onClick={() => {
                            if (props.subData) {
                                props.setSubData(null);
                            } else {
                                props.setShowModal(false);
                                props.setData({});
                                document.body.style.overflow = "unset";
                            }
                        }}
                    />
                    <div className={MobileModalStyles.header}>{props.title}</div>
                    {
                        getAction(
                            (props.subData ? props.subData : props.data)["internalId"],
                            (props.subData ? props.subData : props.data)["status"] && (props.subData ? props.subData : props.data)["status"].text,
                            (checkForTimeKey(props.data, props.subData)),
                            props.actions,
                            { position: 'absolute', right: '20px', top: '15px' },
                            true
                        )
                    }
                    <div className={MobileModalStyles.contentContainer}>
                        {
                            Object.entries(props.subData ? props.subData : props.data).map((info, key) => {
                                let name = info[0].replace(/([A-Z])/g, " $1").trim();
                                name = name.charAt(0).toUpperCase() + name.slice(1);
                                let value = info[1];
                                return (
                                    (info[0] !== "internalId" && info[0] !== "subData" && info[0] !== 'history') &&
                                    <>
                                        <div className={MobileModalStyles.key} key={`key_${key}`}>{name}</div>
                                        <div style={
                                            (value && value.status) ? {
                                                backgroundColor: getColorByStatus(value.status),
                                                color: '#FFF'
                                            } : {}}
                                            className={MobileModalStyles.value}
                                            key={`value_${key}`}
                                        >
                                            {
                                                value ? ((value.text || value.displayType) ? value.text : value) : `-`
                                            }
                                        </div>
                                    </>
                                );
                            })}
                    </div>
                </div>
                {
                    (!props.subData && (props.data["subData"] || props.data["history"])) &&
                    <SubTable
                        title={props.title}
                        screenType={props.screenType}
                        data={props.data.subData}
                        history={props.data.history}
                        mainColNum={props.mainColNum}
                        expanded
                        actions={props.subActions}
                        setSubTableHeight={props.setSubTableHeight}
                        setSubData={props.setSubData}
                    />
                }
            </div> :
            <></>
    );
};

export default MobileModal;
