import styles from '../styles/Loader.module.css';

const Loader = (props) => {

    const style = { display: props.visible ? 'flex' : 'none' };

    return (
        <div style={style} className={styles.background}>
            <div className={styles.loader}></div>
        </div>
    )
}

export default Loader;