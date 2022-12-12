import { LoaderStyles } from '../../styles/elements';

const RotatingLoader = (props) => {

    const style = { display: props.visible ? 'flex' : 'none' };

    return (
        <div style={style} className={LoaderStyles.background}>
            <div className={LoaderStyles.loader}></div>
        </div>
    )
}

export default RotatingLoader;