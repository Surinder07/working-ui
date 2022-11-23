import { useEffect } from "react"

const FullPageWithImageLayout = (props) => {

    useEffect(() => {
        props.setActiveMenu('hide');
    }, []);

    return(
        <div>
            {props.children}
        </div>
    )
}

export default FullPageWithImageLayout;