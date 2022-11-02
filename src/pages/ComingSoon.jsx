import logo from '../assets/SVG/LogoInverted.svg';
import bg from '../assets/coming-soon.jpg';
import style from './styles/ComingSoon.module.css';
import { Link } from "react-router-dom";

const ComingSoon = () => {

    const backgroundStyle = { backgroundImage: `url(${bg})` };

    return (
        <div className={style.background} style={backgroundStyle}>
            <a href="/">
                <img src={logo} alt="HOME" />
            </a>
            <h3>WE ARE PREPARING SOMETHING AWESOME</h3>
            <h1>COMING SOON</h1>
            <div className={style.loader}>
                <div className={style.loader_progress}></div>
            </div>
            <p className={style.loader_percent}>50%</p>
        </div>
    )
}

export default ComingSoon;