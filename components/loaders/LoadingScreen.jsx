import { Favicon } from '../../public/images';
import LinkedImage from '../LinkedImage';
import { LoadingScreenStyles } from '../../styles/elements';

const LoadingScreen = () => {
    return (
        <div className={LoadingScreenStyles.loadingScreen}>
            <div className={LoadingScreenStyles.container}>
                <LinkedImage className={LoadingScreenStyles.logo} src={Favicon} alt='WAAW' />
                <div className={LoadingScreenStyles.loadingContainer}>
                    <h2>Loading</h2>
                    <div className={LoadingScreenStyles.dotPulse}></div>
                </div>
            </div>
        </div>
    )
}

export default LoadingScreen