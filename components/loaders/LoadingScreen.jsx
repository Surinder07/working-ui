import Images from '../../public/Images';
import LinkedImage from '../LinkedImage';
import { LoadingScreenStyles } from '../../styles/elements';

const LoadingScreen = () => {
    return (
        <div className={LoadingScreenStyles.loadingScreen}>
            <div className={LoadingScreenStyles.container}>
                <LinkedImage src={Images.Logo} alt='WAAW' width={400} />
                <div className={LoadingScreenStyles.loadingContainer}>
                    <h2>Loading</h2>
                    <div className={LoadingScreenStyles.dotPulse}></div>
                </div>
            </div>
        </div>
    )
}

export default LoadingScreen