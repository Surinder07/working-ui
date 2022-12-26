import Image from "next/image";
import Card from '../Card';
import { HomeSectionCardStyles, CommonStyles } from '../../styles/elements';
import { joinClasses } from "../../helpers";

const HomeSectionCard = (props) => {

    return (
        <Card className={HomeSectionCardStyles.infoTile}>
            <div>
                <div className={joinClasses(HomeSectionCardStyles.image, CommonStyles.imageContainer)} >
                    <Image
                        className={CommonStyles.image}
                        src={props.tile.icon}
                        alt={props.tile.text}
                    />
                </div>
                <h2>{props.tile.text}</h2>
            </div>
            <p>Coming Soon</p>
        </Card>
    )
}

export default HomeSectionCard;