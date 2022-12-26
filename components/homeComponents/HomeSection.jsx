import HomeSectionCard from './HomeSectionCard';
import { HomeStyles, PageStyles } from '../../styles/pages';
import { joinClasses } from '../../helpers';

const HomeSection = (props) => {

    return (
        <div className={HomeStyles.sectionContainer} style={props.info.styles.text}>
            <div className={HomeStyles.overlay} style={props.info.styles.overlay}></div>
            <div className={joinClasses(HomeStyles.container, PageStyles.pagePadding)} style={props.info.styles.color}>
                <h4 className={HomeStyles.sectionInfo}>{props.info.title}</h4>
                <h1 className={HomeStyles.sectionDescription}>{props.info.description}</h1>
                <div className={HomeStyles.tileContainer}>
                    {
                        props.info.tiles.map((tile, i) => (
                            <HomeSectionCard
                                key={i}
                                tile={tile}
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