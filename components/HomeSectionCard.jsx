import { useState } from "react";
import Image from "next/image";
import Card from './Card';
import styles from '../styles/elements/HomeSectionCard.module.css';

const HomeSectionCard = (props) => {

    const [imageSize, setImageSize] = useState({
        width: 1,
        height: 1
    });

    const updateDimensions = (height, width) => {
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
    }

    return (
        <Card className={styles.infoTile}>
            <div style={{ width: '100%' }}>
                <div style={{
                    width: `${imageSize.width}px`,
                    height: `${imageSize.height}px`,
                    position: 'relative'
                }}>
                    <Image
                        src={props.tile.icon}
                        fill
                        alt={props.tile.text}
                        onLoadingComplete={target => updateDimensions(target.naturalHeight, target.naturalWidth)}
                    />
                </div>
                <h2>{props.tile.text}</h2>
            </div>
            <p>Coming Soon</p>
        </Card>
    )
}

export default HomeSectionCard;