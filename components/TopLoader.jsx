import { useEffect, useState } from 'react';
import styles from '../styles/elements/TopLoader.module.css'

const TopLoader = (props) => {

    const [loaderClass, setLoaderClass] = useState(styles.loadEnd);

    useEffect(() => {
        if (props.pageLoading) setLoaderClass(styles.loadStart);
        else setLoaderClass(styles.loadEnd);
    }, [props.pageLoading])

    return (
        <div className={`${styles.bar} ${loaderClass}`}>

        </div>
    )
}

export default TopLoader;