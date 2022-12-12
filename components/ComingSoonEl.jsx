import { ComingSoonElStyles } from '../styles/elements';

const ComingSoonEl = () => {
    return (
        <div className={ComingSoonElStyles.container}>
            <h1 className={ComingSoonElStyles.containerComingSoon}><span className={ComingSoonElStyles.blueTextColor}>Coming</span> Soon</h1>
            <p className={ComingSoonElStyles.containerStayTuned}>Stay Tuned!</p>
            <div className={ComingSoonElStyles.line}></div>
        </div>
    )
}

export default ComingSoonEl;