import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const LinkedImage = (props) => {

    const [imageSize, setImageSize] = useState({
        width: 1,
        height: 1
    });

    const updateDimensions = (height, width) => {
        let newWidth;
        let newHeight;
        if (typeof props.height == 'undefined' && typeof props.width == 'undefined') {
            newWidth = width;
            newHeight = height;
        } else if (typeof props.height == 'undefined') {
            newWidth = props.width;
            newHeight = (props.width * height) / width;
        } else if (typeof props.width == 'undefined') {
            newWidth = (props.height * width) / height;
            newHeight = props.height;
        } else {
            newWidth = props.width;
            newHeight = props.height;
        }
        setImageSize({
            width: newWidth,
            height: newHeight
        })
    }

    const style = {
        ...props.style,
        width: `${imageSize.width}px`,
        height: `${imageSize.height}px`,
        position: 'relative'
    }

    return (
        <div style={style}>
            <Link
            href={props.link ? props.link : '#'}
            scroll={props.link ? true : false}
                style={{
                    width: '100%',
                    height: '100%',
                    cursor: props.link ? 'pointer' : 'default'
                }}
                onClick={props.onClick}
                target={props.newTab ? '_blank' : '_self'}
            >
                <Image
                    src={props.src}
                    fill
                    alt={props.alt}
                    onLoadingComplete={target => updateDimensions(target.naturalHeight, target.naturalWidth)}
                />
            </Link>
        </div>
    )
}

export default LinkedImage;