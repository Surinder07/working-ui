import {WaawHead, ComingSoonEl, HomeSection, Card, SubscribeBar} from "../components";
import {business, talent} from "../constants";
import {HomeStyles, PageStyles} from "../styles/pages";
import {useEffect} from "react";
import {joinClasses} from "../helpers";

const Home = (props) => {
    useEffect(() => {
        props.setPageInfo({
            authenticationRequired: false,
            pageView: "loggedOut",
            activeMenu: "none",
            activeSubMenu: "none",
        });
    }, []);

    return (
        <>
            <WaawHead />
            <div className={PageStyles.page}>
                <div className={joinClasses(HomeStyles.introSection, PageStyles.pagePadding)}>
                    <div className={HomeStyles.introContent}>
                        <h1 className={HomeStyles.introText}>
                            The <span className={HomeStyles.colorBlue}>world's first</span> platform to inspire people and business to <span className={HomeStyles.colorBlue}>grow</span> and{" "}
                            <span className={HomeStyles.colorBlue}>thrive together</span>
                        </h1>
                        <div className={HomeStyles.introBottom}>
                            <ComingSoonEl />
                            <Card className={HomeStyles.subscribeBox}>
                                <h3>Submit your email to join the wait list.</h3>
                                <SubscribeBar buttonColor={"#333"} buttonText={"#fff"} background={"#fff"} />
                            </Card>
                        </div>
                    </div>
                    <div className={HomeStyles.introFiller}></div>
                </div>
                <HomeSection info={business} />
                <HomeSection info={talent} />
            </div>
        </>
    );
};

export default Home;
