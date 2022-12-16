import { WaawHead, LinkedImage } from "../components";
import { LoginRegisterLayout } from "../styles/layouts";
import Images from "../public/Images";

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
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <LinkedImage src={Images.Logo} link='/' height={60} alt='Logo' />
                                </div>
                            }
                            {props.children}
                        </div>
                        <div className={LoginRegisterLayout.gridRightContainer} style={{ backgroundImage: `url(${props.background})` }}>
                            {
                                props.logoRight &&
                                <LinkedImage className={LoginRegisterLayout.rightLogo} src={Images.Logo} height={70} link='/' alt='logo' />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginRegistrationLayout;
