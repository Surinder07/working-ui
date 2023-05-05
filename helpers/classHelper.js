export const joinClasses = (...classes) => {
    return classes.filter(Boolean).join(" ");
};

/**
 * returns true if date given is in the past
 * @param {*} date date received from API in yyyy-MM-dd hh:mm format
 */
export const checkDateForPast = (date) => {
    const dateToCompare = new Date(date);
    return dateToCompare.getTime() > new Date().getTime();
}

/**
 * Checks if any of keys startDate or inTime are present in the data or subData and return the time value accordingly
 * @param {*} data data for tabular view
 * @param {*} subData sub data for tabular view
 */
export const checkForTimeKey = (data, subData) => {
    return (subData && subData.inTime) ? subData.inTime : ((data && data.inTime) ? data.inTime : data.startDate);
}