import { textAlign } from "@mui/system";
import { useEffect } from "react";
import { useState } from "react"

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
        marginBottom: '20px'
    }

    const satisfiedStyle = {
        color: '#0091d0'
    }

    return (
        <p style={style}>Password should be atleast
            <span style={charLimit ? satisfiedStyle : {}}> 8 characters</span>, and should contain atleast
            <span style={uppercase ? satisfiedStyle : {}}> 1 Uppercase letter</span>,
            <span style={lowercase ? satisfiedStyle : {}}> 1 Lowercase letter</span>,
            <span style={number ? satisfiedStyle : {}}> 1 Number</span> and
            <span style={specialCharacter ? satisfiedStyle : {}}> 1 Special Character{`${'(@$!%*?&)'}`}</span>
        </p>
    )
}

export default PasswordPolicy;