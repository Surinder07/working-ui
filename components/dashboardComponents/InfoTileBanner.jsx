import { DashboardStyles } from '../../styles/pages';
import Link from 'next/link';
import { DashboardInfoTiles } from '../../constants';
import { useState } from 'react';
import DashboardCard from './DashboardCard';

const InfoTileBanner = () => {

    const [tileValues, setTileValues] = useState({
        employee: '256/260',
        location: '10/12',
        holiday: 2,
        requests: 2
    })

    return (
        <div className={DashboardStyles.infoTileContainer}>
            {
                DashboardInfoTiles.map((info, i) => (
                    <Link key={`infoTile${i}`} href={info.href}>
                        <DashboardCard className={DashboardStyles.infoTile} style={{ backgroundImage: `url(${info.icon.src})`, cursor: 'pointer' }}>
                            <div>
                                <h2>{info.title}</h2>
                                {info.timeframe && <h3>{info.timeframe}</h3>}
                            </div>
                            {
                                typeof tileValues[info.name] === 'string' && tileValues[info.name].includes('/') ?
                                <h1 className={DashboardStyles.compareValue}>{tileValues[info.name]}</h1> :
                                <h1 className={DashboardStyles.normalValue}>{tileValues[info.name]}</h1>
                            }
                        </DashboardCard>
                    </Link>
                ))
            }
        </div>
    )
}

export default InfoTileBanner;