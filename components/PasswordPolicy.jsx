import { useEffect, useState } from "react"

const PasswordPolicy = (props) => {

    const [charLimit, setCharLimit] = useState(false);
    const [uppercase, setUppercase] = useState(false);
    const [lowercase, setLowercase] = useState(false);
    const [number, setNumber] = useState(false);
    const [specialCharacter, setSpecialCharacter] = useState(false);

    useEffect(() => {
        if (props.password.length > 7) setCharLimit(true);
        else setCharLimit(false);
        if (props.password !== props.password.toLowerCase()) setUppercase(true);
        else setUppercase(false);
        if (props.password !== props.password.toUpperCase()) setLowercase(true);
        else setLowercase(false);
        if (/\d/.test(props.password)) setNumber(true);
        else setNumber(false);
        if (/[@$!%*?&]/.test(props.password)) setSpecialCharacter(true);
        else setSpecialCharacter(false);
    }, [props.password])

    const style = {
        fontWeight: 500,
        fontSize: '11px',
        lineHeight: '16px',
        color: '#535255',
        opacity: '0.75',
        textAlign: 'left',
        marginBottom: props.noMargin ? 0 : '20px'
    }

    const satisfiedStyle = {
        color: '#0091d0'
    }

    const errorStyle = {
        color: 'var(--error-message-color)',
        fontWeight: 600
    }

    return (
        <p style={style}>Password should be atleast
            <span style={charLimit ? satisfiedStyle : props.showError ? errorStyle : {}}> 8 characters</span>, and should contain atleast
            <span style={uppercase ? satisfiedStyle : props.showError ? errorStyle : {}}> 1 Uppercase letter</span>,
            <span style={lowercase ? satisfiedStyle : props.showError ? errorStyle : {}}> 1 Lowercase letter</span>,
            <span style={number ? satisfiedStyle : props.showError ? errorStyle : {}}> 1 Number</span> and
            <span style={specialCharacter ? satisfiedStyle : props.showError ? errorStyle : {}}> 1 Special Character{`${'(@$!%*?&)'}`}</span>
        </p>
    )
}

export default PasswordPolicy;