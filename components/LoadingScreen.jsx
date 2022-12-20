import React from 'react'
import styles from '../styles/elements/homeStyles/LoadingScreen.module.css'
// import Logo from "../public/Images";
const LoadingScreen = () => {
  return (
    <div className={styles.loadingmain}>
       <img src="http://localhost:3000/_next/static/media/logo.74358ecc.svg" alt="ff" />
        <h2>Loading your options, please wait <span className={styles.dotflashing}></span></h2>
    </div>
  )
}

export default LoadingScreen