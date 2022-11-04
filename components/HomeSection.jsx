import Card from './Card';
import styles from '../styles/Home.module.css';

const HomeSection = (props) => {

    const textColor = { color: props.info.textColor }
    const overlayStyle = { backgroundColor: props.info.overlay }

    return (
        <div className={props.className}>
            <div className={styles.overlay} style={overlayStyle}></div>
            <div className={`${styles.container} pagePadding`}>
                <div style={{ height: '50px' }}></div>
                <h4 style={textColor}>{props.info.title}</h4>
                <h1 className={styles.sectionDescription} style={textColor}>{props.info.description}</h1>
                <div className={styles.cardContainer}>
                    {
                        props.info.tiles.map((tile, i) => (
                            <Card key={i} img={tile.icon} text={tile.text} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default HomeSection;