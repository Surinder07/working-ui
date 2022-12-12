import HomeSectionCard from './HomeSectionCard';
import { HomeStyles, PageStyles } from '../../styles/pages';

const HomeSection = (props) => {

    // Destkop Size: 1, Tab Size: 2, Mobile Size: 3
    const iconHeight = {
        1: 90,
        2: 80,
        3: 70
    }

    return (
        <div className={HomeStyles.sectionContainer} style={props.info.styles.text}>
            <div className={HomeStyles.overlay} style={props.info.styles.overlay}></div>
            <div className={`${HomeStyles.container} ${PageStyles.pagePadding}`} style={props.info.styles.color}>
                <h4 className={HomeStyles.sectionInfo}>{props.info.title}</h4>
                <h1 className={HomeStyles.sectionDescription}>{props.info.description}</h1>
                <div className={HomeStyles.tileContainer}>
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
            <div className={HomeStyles.background} style={props.info.styles.image}></div>
        </div>
    )
}

export default HomeSection;