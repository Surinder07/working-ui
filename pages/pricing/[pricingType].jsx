import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from '../../styles/pages/Pricing.module.css';
import pageStyles from '../../styles/Pages.module.css';
import { PricingInfo } from '../../constants/PricingInfo';
import { Check } from '@mui/icons-material';

const Pricing = (props) => {

    const router = useRouter();

    const data = PricingInfo[router.query.pricingType];
    const style = {
        backgroundImage: `url(${data.background.src})`
    }

    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: 'loggedOut',
            activeMenu: 'PRICING',
            activeSubMenu: router.query.pricingType === 'business' ? 'BUSINESS' : 'TALENT'
        })
    }, [router.query])

    return (
        <div className={`${pageStyles.page} ${pageStyles.flexPageColumn}`}>
            <div className={`${pageStyles.pageMargin} ${pageStyles.smallContentContainer}`}>
                <h1>{data.title}</h1>
                <p>{data.description}</p>
                <div className={styles.background} style={style}></div>
            </div>
            <div className={`${pageStyles.pagePadding} ${styles.pricingBackground}`}>
                <div className={styles.pricingContainer}>
                    <div className={styles.leftContainer}>
                        <h3>Features</h3>
                        <ul>
                            {
                                data.features.map((feature, i) => (
                                    <li key={`feat${i}`}>
                                        <Check style={{ color: '#5abc6a' }} />
                                        <p>{feature}</p>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className={styles.rightContainer}>
                        {
                            data.tables.map((table, i) => (
                                <div key={`tab${i}`}>
                                    <h3>{table.title}</h3>
                                    <table>
                                        {
                                            Object.entries(table.content).map((row, i) => (
                                                <tr key={`row${i}`}>
                                                    <td>{row[0]}</td>
                                                    <td>{row[1]}</td>
                                                </tr>
                                            ))
                                        }
                                    </table>
                                </div>
                            ))
                        }
                        {
                            data.extraDetails.map((detail, i) => (
                                <p key={`detail${i}`}>{`*${detail}`}</p>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pricing;

export async function getStaticPaths() {
    return {
        paths: [
            {
                params: {
                    pricingType: 'business'
                }
            },
            {
                params: {
                    pricingType: 'talent'
                }
            }
        ],
        fallback: false
    }
}

export async function getStaticProps(context) {
    return {
        props: {}
    }
}