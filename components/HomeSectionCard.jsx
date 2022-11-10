import { useEffect, useState } from "react";
import Image from "next/image";
import Card from './Card';
import styles from '../styles/elements/HomeSectionCard.module.css';

const HomeSectionCard = (props) => {

    const [imageSize, setImageSize] = useState({
        width: 1,
        height: 1
    });

    useEffect(() => {
        const { width, height } = props.tile.icon
        let newWidth;
        let newHeight;
        if (typeof props.height != 'undefined') {
            newWidth = (props.height * width) / height;
            newHeight = props.height;
        } else {
            newWidth = width;
            newHeight = height;
        }
        setImageSize({
            width: newWidth,
            height: newHeight
        })
    }, [])

    return (
        <Card className={styles.infoTile}>
            <div style={{ width: '100%' }}>
                <Image
                    src={props.tile.icon}
                    width={imageSize.width}
                    height={imageSize.height}
                    alt={props.tile.text}
                />
                <h2>{props.tile.text}</h2>
            </div>
            <p>Coming Soon</p>
        </Card>
    )
}

export default HomeSectionCard;