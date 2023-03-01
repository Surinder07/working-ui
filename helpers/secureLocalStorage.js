import CryptoJS from "crypto-js"

const secret = 'WAAW_ENCRYPTION';

const saveData = (key, value) => {
    const encryptedData = CryptoJS.AES.encrypt(value.toString(), secret).toString();
    localStorage.setItem(key, encryptedData);
}

const getData = (key) => {
    if (typeof window === 'undefined') return '';
    const savedEncryptedData = localStorage.getItem(key);
    if (savedEncryptedData != null && savedEncryptedData != '') {
        return CryptoJS.AES.decrypt(savedEncryptedData, secret).toString(CryptoJS.enc.Utf8);
    }
    return null;
}

export const secureLocalStorage = {
    saveData,
    getData
}