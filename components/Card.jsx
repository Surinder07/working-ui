import Link from "next/link";

const Card = (props) => {

    const style = {
        ...props.style,
        boxShadow: '0 0 10px 2px rgba(33, 33, 33, 0.2)',
        borderRadius: '1rem'
    }

    return (
        <Link
            href={props.href ? props.href : '#'}
            scroll={props.href ? true : false}
            style={{
                cursor: props.href ? 'pointer': 'default'
            }}
        >
            <div style={style} className={props.className}>{props.children}</div>
        </Link>
    )
}

export default Card;