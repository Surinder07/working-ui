import Card from './Card';
import styles from '../styles/pages/Home.module.css';

const HomeSection = (props) => {

    return (
        <div className={styles.sectionContainer} style={props.info.styles.text}>
            <div className={styles.overlay} style={props.info.styles.overlay}></div>
            <div className={`${styles.container} pagePadding`} style={props.info.styles.color}>
                <h4>{props.info.title}</h4>
                <h1 className={styles.sectionDescription}>{props.info.description}</h1>
                <div className={styles.cardContainer}>
                    {
                        props.info.tiles.map((tile, i) => (
                            <Card key={i} img={tile.icon} text={tile.text} />
                        ))
                    }
                </div>
            </div>
            <div className={styles.background} style={props.info.styles.image}></div>
        </div>
    )
}

export default HomeSection;