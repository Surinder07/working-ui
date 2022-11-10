import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";

const LinkedImage = (props) => {

    const [imageSize, setImageSize] = useState({
        width: 1,
        height: 1
    });

    useEffect(() => {
        let newWidth;
        let newHeight;
        const {height, width} = props.src;
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
    }, []) 

    const style = {
        ...props.style,
        width: `${imageSize.width}px`,
        height: `${imageSize.height}px`,
        cursor: props.link ? 'pointer' : 'default'
    }

    return (
        <Link
            href={props.link ? props.link : '#'}
            scroll={props.link ? true : false}
            style={style}
            onClick={props.onClick}
            target={props.newTab ? '_blank' : '_self'}
        >
            <Image
                src={props.src}
                width={imageSize.width}
                height={imageSize.height}
                alt={props.alt}
            />
        </Link>
    )
}

export default LinkedImage;