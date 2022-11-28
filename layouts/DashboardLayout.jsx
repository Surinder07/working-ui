import Link from 'next/link';
import ConstantHamburger from '../components/hamburgers/ConstantHamburger';
import LinkedImage from '../components/LinkedImage';
import { ImagesInfo, SideNavInfo } from '../constants';
import Images from '../public/Images';
import styles from '../styles/layouts/Dashboard.module.css';
import { Logout, Settings } from '@mui/icons-material';
import { useRef, useEffect, useState, useCallback } from 'react';

const Dashboard = (props) => {

    const sideNavRef = useRef();

    const [y, setY] = useState(window.scrollY);
    const [sideNavStyle, setSideNavStyle] = useState({});
    const [navOpen, setNavOpen] = useState(true);

    const handleNavigation = useCallback(
        e => {
            const window = e.currentTarget;
            if (sideNavRef.current.clientHeight > window.scrollY + window.innerHeight) {
                setSideNavStyle({})
            } else if (y < window.scrollY && sideNavRef.current.clientHeight < window.scrollY + window.innerHeight) {
                setSideNavStyle({ position: 'fixed', bottom: 0 })
            }
            setY(window.scrollY);
        }, [y]
    );

    useEffect(() => {
        setY(window.scrollY);
        window.addEventListener("scroll", handleNavigation);
        return () => {
            window.removeEventListener("scroll", handleNavigation);
        };
    }, [handleNavigation]);

    return (
        <div className={`${styles.dashboardPage} ${navOpen ? styles.openNavDashboard : styles.closeNavDashboard}`}>
            <div style={{ position: 'relative', width: 'inherit' }}>
                <div className={styles.sideNav} ref={sideNavRef} style={sideNavStyle}>
                    <div>
                        <div style={{ margin: '0 auto', width: 'fit-content' }}>
                            <LinkedImage src={navOpen ? Images.LogoWhite : Images.FaviconWhite} width={navOpen ? 160 : 30} alt='Logo' link='/dashboard' />
                        </div>
                        <p className={styles.version} >Version: {process.env.version}</p>
                        <div style={{ marginTop: '20px' }}>
                            {
                                SideNavInfo['admin'].map((info, key) => (
                                    <Link href={info.link} key={key}>
                                        <div className={`${styles.menuItem} ${info.activeKey === props.pageInfo.activeMenu ? styles.activeMenuItem : ''}`}
                                        style={navOpen ? {} : {margin: 'auto', width: '100%'}} >
                                            {info.icon}
                                            {navOpen && <p style={{ marginLeft: '10px' }}>{info.text}</p>}
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                    <div style={{ height: '80px' }}></div>
                    <div>
                        <div className={`${styles.menuItem} ${props.pageInfo.activeMenu === 'SETTINGS' ? styles.activeMenuItem : ''}`}>
                            <Settings style={{ fontSize: '16px' }} />
                            {navOpen && <p style={{ marginLeft: '10px' }}>Settings</p>}
                        </div>
                        <div className={`${styles.menuItem}`}>
                            <Logout style={{ fontSize: '16px' }} />
                            {navOpen && <p style={{ marginLeft: '10px' }}>Logout</p>}
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ position: 'relative' }}>
                <div className={styles.header}>
                    <ConstantHamburger setOpen={setNavOpen} open={navOpen} />
                </div>
                <div className={styles.content}>
                    {props.children}
                </div>
                <div className={styles.footer}>
                    <div className={styles.leftContainer}>
                        <p style={{marginRight: '20px'}}>&#169;{` ${(new Date()).getFullYear()} WAAW. All Rights Reserved`}</p>
                        {
                            ImagesInfo.footerIcons.socialIcons.map((icon, i) => (
                                <LinkedImage style={{marginRight: '10px'}} height={20} src={icon.src} alt={icon.alt} link={icon.link} />
                            ))
                        }
                    </div>
                    <LinkedImage src={Images.Favicon} height={25} alt='WAAW'/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;