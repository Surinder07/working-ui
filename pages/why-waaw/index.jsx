import styles from '../../styles/pages/WhyWaaw.module.css';

const WhyWaaw = () => {
    return (
        <div className={`page ${styles.aboutUsPage}`}>
            <div className={`pageMargin ${styles.contentContainer}`}>
                <h1>Why WAAW?</h1>
                <p>At WAAW, our purpose is to inspire people and business to grow and thrive together. We firmly believe in our mission to create economic opportunities, so people have better lives. As a result, we've become the world's first platform where everyday businesses of all sizes and independent talent from around the globe meet here to accomplish incredible things.</p>
                <p>Everything about the way we work at is fundamentally transforming around us, and the line between work and life is continually redrawn. Sometimes daily or hourly it seems. To survive in this ever-evolving world of work, you need a partner that can provide businesses the right tools and guidance to keep employees productive and connected as well as manage variable capacity efficiently. However, to truly thrive in this environment you also need a partner who has a deep understanding of not just your employees, but the talent available locally / globally who need to work in unison can truly help your business. This makes the local community you are serving happy and your business great.</p>
            </div>
            <img src='/bg/why-waaw-bg.svg' className={styles.middleBackground} />
            <div className={styles.greyContainer}>
                <div className={`pageMargin ${styles.contentContainer}`}>
                    <h1>About Us</h1>
                    <p>WAAW Global inc is a global software company that is on a mission to help both business and talent community alike. Led by a team committed to helping businesses find more flexibility and connecting talent with more opportunities. We deliver on this mission through our flogship cloud platform WAAW by Providing hourly workplaces with an integrated scheduling, time tracking, team messaging and also talent management capabilities all in a single solution. This enhances the employee experience, drives better business outcomes and creates economic opportunities for the talent community worldwide. Our platform supports businesses of all sizes.</p>
                </div>
            </div>
        </div>
    )
}

export default WhyWaaw;