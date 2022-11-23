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