const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const usernameRegex = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/;

export const validateEmail = (email) => {
    return emailRegex.test(email);
}

export const validatePassword = (password) => {
    return passwordRegex.test(password);
}

export const validateUsername = (username) => {
    return usernameRegex.test(username);
}

export const validateUsernameEmail = (login) => {
    return usernameRegex.test(login) || emailRegex.test(login);
}

export const checkCardType = (number) => {
    let amex = /^3[47][0-9]{13}$/;
    let visa = /^4[0-9]{12}(?:[0-9]{3})?$/;
    let cup1 = /^62[0-9]{14}[0-9]*$/;
    let cup2 = /^81[0-9]{14}[0-9]*$/;

    let mastercard = /^5[1-5][0-9]{14}$/;
    let mastercard2 = /^2[2-7][0-9]{14}$/;

    let disco1 = /^6011[0-9]{12}[0-9]*$/;
    let disco2 = /^62[24568][0-9]{13}[0-9]*$/;
    let disco3 = /^6[45][0-9]{14}[0-9]*$/;

    let diners = /^3[0689][0-9]{12}[0-9]*$/;
    let jcb = /^35[0-9]{14}[0-9]*$/;


    if (visa.test(number)) {
        return 'VISA';
    }
    if (amex.test(number)) {
        return 'AMEX';
    }
    if (mastercard.test(number) || mastercard2.test(number)) {
        return 'MASTERCARD';
    }
    if (disco1.test(number) || disco2.test(number) || disco3.test(number)) {
        return 'DISCOVER';
    }
    if (diners.test(number)) {
        return 'DINERS';
    }
    if (jcb.test(number)) {
        return 'JCB';
    }
    if (cup1.test(number) || cup2.test(number)) {
        return 'CHINA_UNION_PAY';
    }
    return 'UNKNOWN';
}