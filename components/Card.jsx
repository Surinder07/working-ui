import styles from '../styles/elements/Card.module.css';

const Card = (props) => {

    const style = {
        backgroundColor: props.backgroundColor,
        color: props.color
    }

    return(
        <div className={styles.card}>
            <img src={props.img} alt='icon'/>
            <h2>{props.text}</h2>
            <p>Coming Soon</p>
        </div>
    )
}

export default Card;