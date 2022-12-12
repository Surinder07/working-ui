import { useEffect, useState } from 'react';
import { TopLoaderStyles } from '../../styles/elements'

const TopLoader = (props) => {

    const [loaderClass, setLoaderClass] = useState(TopLoaderStyles.loadEnd);

    useEffect(() => {
        if (props.pageLoading) setLoaderClass(TopLoaderStyles.loadStart);
        else setLoaderClass(TopLoaderStyles.loadEnd);
    }, [props.pageLoading])

    return (
        <div className={`${TopLoaderStyles.bar} ${loaderClass}`}>
        </div>
    )
}

export default TopLoader;