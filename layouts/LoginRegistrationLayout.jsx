import { WaawHead, LinkedImage } from "../components";
import { LoginRegisterLayout } from "../styles/layouts";
import { Logo } from "../public/images";

const LoginRegistrationLayout = (props) => {

    return (
        <>
            <WaawHead title={props.pageTitle} />
            <div className={LoginRegisterLayout.page}>
                <div className={LoginRegisterLayout.pageContainer}>
                    <div className={LoginRegisterLayout.gridContainer}>
                        <div className={LoginRegisterLayout.gridLeftContainer}>
                            {
                                props.logoLeft &&
                                <div className={LoginRegisterLayout.logoLeftContainer} >
                                    <LinkedImage className={LoginRegisterLayout.leftLogo} src={Logo} link='/' alt='Logo' heightOrient />
                                </div>
                            }
                            {props.children}
                        </div>
                        <div className={LoginRegisterLayout.gridRightContainer} style={{ backgroundImage: `url(${props.background})` }}>
                            {
                                props.logoRight &&
                                <LinkedImage className={LoginRegisterLayout.rightLogo} src={Logo} link='/' alt='logo' heightOrient />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginRegistrationLayout;
