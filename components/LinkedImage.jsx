import { CommonStyles } from '../styles/elements';
import { joinClasses } from '../helpers';
import Link from "next/link";
import Image from "next/image";

const LinkedImage = (props) => {

    const style = {
        cursor: props.link ? 'pointer' : 'default',
        ...props.style
    }

    return (
        <Link
            className={props.className}
            href={props.link ? props.link : '#'}
            scroll={props.link ? true : false}
            target={props.newTab ? '_blank' : '_self'}
            style={{ width: 'unset' }}
        >
            <div className={joinClasses(props.className, CommonStyles.imageContainer)} style={style} >
                <Image
                    className={joinClasses(CommonStyles.image, props.heightOrient ? CommonStyles.imageHeight : CommonStyles.imageWidth)}
                    style={props.imgStyle}
                    src={props.src}
                    alt={props.alt}
                    quality={props.keepQuality ? 100 : 75}
                    fill
                />
            </div>
        </Link>
    )
}

export default LinkedImage;