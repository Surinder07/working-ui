import { ClockStyles } from "../../styles/elements";
import { joinClasses } from "../../helpers";
import { useEffect, useState } from "react";

const Clock = ({ className }) => {

    const [time, setTime] = useState({
        hour: '00',
        minute: '00',
        second: '00'
    });
    const [date, setDate] = useState("");

    const refreshClock = () => {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        setDate(now.toLocaleString('default', { month: 'long', day: 'numeric' }))
        const timeArray = timeString.split(' ')[0].split(':');
        setTime({
            hour: (timeString.split(' ')[1].toLowerCase() === 'pm' ? parseInt(timeArray[0]) + 12 : timeArray[0]).toString().padStart(2, '0'),
            minute: timeArray[1].padStart(2, '0'),
            second: timeArray[2].padStart(2, '0')
        });
    }

    useEffect(() => {
        const timerId = setInterval(refreshClock, 1000);
        return function cleanup() {
            clearInterval(timerId);
        };
    }, []);

    return (
        <div>
        <div className={joinClasses(ClockStyles.container, className)}>
            <h3>{time.hour}:{time.minute}</h3>
            <h4>{time.second}s</h4>
        </div>
        <h3 className={ClockStyles.date}>{date}</h3>
        </div>
    )
}

export default Clock;