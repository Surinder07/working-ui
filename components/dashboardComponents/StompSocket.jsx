import { fetchWrapper, secureLocalStorage } from "../../helpers";
import SockJsClient from 'react-stomp';
import { userService } from "../../services";

const webSocketEndpoints = process.env.endpoints.webSocket;

const StompSocket = (props) => {

    return (
        <>
            <SockJsClient url={fetchWrapper.getApiUrl(webSocketEndpoints.endpoint).replace('api/', '')}
                headers={{ access_token: props.token }}
                topics={[
                    webSocketEndpoints.topics.notification,
                    webSocketEndpoints.topics.shift,
                    webSocketEndpoints.topics.timesheet,
                    webSocketEndpoints.topics.userInvite,
                    webSocketEndpoints.topics.holidayUpload,
                    webSocketEndpoints.topics.updateUserDetail
                ]}
                onConnect={() => {
                    console.log("Connected to Websocket");
                }}
                onDisconnect={() => {
                    console.log("Disconnected from Websocket");
                }}
                onMessage={(msg, topic) => {
                    switch (topic) {
                        case webSocketEndpoints.topics.notification:
                            props.setNotificationToast({
                                show: true,
                                title: msg.title,
                                message: msg.description
                            })
                            props.setStompMsg({
                                ...props.stompMsg,
                                notification: msg
                            })
                            break;
                        case webSocketEndpoints.topics.shift:
                            props.setStompMsg({
                                ...props.stompMsg,
                                shift: true
                            })
                            break;
                        case webSocketEndpoints.topics.timesheet:

                            break;
                        case webSocketEndpoints.topics.userInvite:
                            props.setStompMsg({
                                ...props.stompMsg,
                                invite: true
                            })
                            break;
                        case webSocketEndpoints.topics.holidayUpload:
                            props.setStompMsg({
                                ...props.stompMsg,
                                holiday: true
                            })
                            break;
                        case webSocketEndpoints.topics.updateUserDetail:
                            secureLocalStorage.saveData(userService.USER_KEY, JSON.stringify(msg));
                            props.setUser(msg);
                    }
                }}
                options={{ headers: { access_token: props.token } }}
                debug={false}
            />
        </>
    )
}

export default StompSocket;