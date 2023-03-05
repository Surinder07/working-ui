import { fetchWrapper } from "../../helpers";
import SockJsClient from 'react-stomp';

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
                    webSocketEndpoints.topics.holidayUpload
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

                            break;
                        case webSocketEndpoints.topics.timesheet:

                            break;
                        case webSocketEndpoints.topics.userInvite:

                            break;
                        case webSocketEndpoints.topics.holidayUpload:

                            break;
                    }
                    console.log(msg)
                    console.log(topic)
                    // updateNotification(msg);
                }}
                options={{ headers: { access_token: props.token } }}
                debug={false}
            />
        </>
    )
}

export default StompSocket;