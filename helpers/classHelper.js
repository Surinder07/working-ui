export const joinClasses = (...classes) => {
    return classes.filter(Boolean).join(" ");
};