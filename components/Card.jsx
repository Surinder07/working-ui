import styles from '../styles/Card.module.css';

const Card = (props) => {

    const style = {
        backgroundColor: props.backgroundColor,
        color: props.color
    }

    return(
        <div className={styles.card}>
            <img src={props.img} alt='icon'/>
            <h2 style={{marginBottom: '50px'}}>{props.text}</h2>
            <p>Coming Soon</p>
        </div>
    )
}

export default Card;