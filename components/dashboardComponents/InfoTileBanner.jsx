import { DashboardStyles } from '../../styles/pages';
import Link from 'next/link';
import { DashboardInfoTiles, DashboardTileMap } from '../../constants';
import DashboardCard from './DashboardCard';

const InfoTileBanner = (props) => {

    return (
        (props.role && props.data) &&
        <div className={DashboardStyles.infoTileContainer}>
            {
                DashboardTileMap[props.role.toLowerCase()].map((tile, i) => (
                    <Link key={`infoTile${i}`} href={DashboardInfoTiles[tile].href}>
                        <DashboardCard className={DashboardStyles.infoTile} style={{ backgroundImage: `url(${DashboardInfoTiles[tile].icon.src})`, cursor: 'pointer' }}>
                            <div>
                                <h2>{DashboardInfoTiles[tile].title}</h2>
                                {DashboardInfoTiles[tile].timeframe && <h3>{DashboardInfoTiles[tile].timeframe}</h3>}
                            </div>
                            {
                                typeof props.data[tile] === 'string' && props.data[tile].includes('/') ?
                                    <h1 className={DashboardStyles.compareValue}>{props.data[tile] ? props.data[tile] : '-/-'}</h1> :
                                    <h1 className={DashboardStyles.normalValue}>{props.data[tile] ? props.data[tile] : '-'}</h1>
                            }
                        </DashboardCard>
                    </Link>
                ))
            }
        </div>
    )
}

export default InfoTileBanner;