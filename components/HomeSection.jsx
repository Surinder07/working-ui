import HomeSectionCard from './HomeSectionCard';
import styles from '../styles/pages/Home.module.css';

const HomeSection = (props) => {

    // Destkop Size: 1, Tab Size: 2, Mobile Size: 3
    const iconHeight = {
        1: 90,
        2: 80,
        3: 70 
    }

    return (
        <div className={styles.sectionContainer} style={props.info.styles.text}>
            <div className={styles.overlay} style={props.info.styles.overlay}></div>
            <div className={`${styles.container} pagePadding`} style={props.info.styles.color}>
                <h4 className={styles.sectionInfo}>{props.info.title}</h4>
                <h1 className={styles.sectionDescription}>{props.info.description}</h1>
                <div className={styles.tileContainer}>
                    {
                        props.info.tiles.map((tile, i) => (
                            <HomeSectionCard
                                key={i}
                                tile={tile}
                                height={iconHeight[props.screenType]}
                            />
                        ))
                    }
                </div>
            </div>
            <div className={styles.background} style={props.info.styles.image}></div>
        </div>
    )
}

export default HomeSection;