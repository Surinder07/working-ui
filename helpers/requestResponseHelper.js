// Requests -----------------
export const saveUserRequestBody = (firstName, lastName, locationRoleId, locationId,
    employeeId, email, fullTime) => {
    return {
        firstName, lastName, locationRoleId, locationId, employeeId, email, fullTime
    }
}

export const getEmployeeListing = (data, auth) => {

    const getStatus = (status) => {
        if (status === "PAID_AND_ACTIVE") return { text: "ACTIVE", displayType: "bg", status: "ok" };
        else if (status === "INVITED") return { text: "INVITED", displayType: "bg", status: "warn" };
        else if (status === "DISABLED") return { text: "DISABLED", displayType: "bg", status: "bad" };
    };

    return data.map(user => {
        return auth === 'ADMIN' ? {
            internalId: user.id,
            id: user.waawId,
            employeeName: user.fullName,
            email: user.email,
            location: user.location,
            role: user.role,
            employeeType: user.fullTime ? "Full Time" : "Contractor",
            lastLogin: user.lastLogin,
            status: getStatus(user.status)
        } : {
            internalId: user.id,
            id: user.waawId,
            employeeName: user.fullName,
            email: user.email,
            role: user.role,
            employeeType: user.fullTime ? "Full Time" : "Contractor",
            lastLogin: user.lastLogin,
            status: getStatus(user.status)
        };
    })

}

export const editRoleRequestBody = (id, totalHoursPerDayMin, totalHoursPerDayMax, minHoursBetweenShifts, maxConsecutiveWorkDays) => {
    return { id, totalHoursPerDayMin, totalHoursPerDayMax, minHoursBetweenShifts, maxConsecutiveWorkDays }
}

export const addRoleRequestBody = (locationId, name, totalHoursPerDayMin, totalHoursPerDayMax,
    minHoursBetweenShifts, maxConsecutiveWorkDays, isAdmin) => {
    return { locationId, name, totalHoursPerDayMin, totalHoursPerDayMax, minHoursBetweenShifts, maxConsecutiveWorkDays, isAdmin }
}

export const getRoleListing = (data, auth) => {
    return data.map(role => {
        return auth === 'ADMIN' ? {
            internalId: role.id,
            id: role.waawId,
            roleName: role.name,
            location: role.location,
            creationDate: role.creationDate,
            createdBy: role.createdBy,
            status: {
                text: role.active ? 'ACTIVE' : 'DISABLED',
                displayType: 'bg',
                status: role.active ? 'ok' : 'bad'
            }
        } : {
            internalId: role.id,
            id: role.waawId,
            roleName: role.name,
            creationDate: role.creationDate,
            createdBy: role.createdBy,
            status: {
                text: role.active ? 'ACTIVE' : 'DISABLED',
                displayType: 'bg',
                status: role.active ? 'ok' : 'bad'
            }
        }
    })
}

export const getLocationListing = (data) => {
    return data.map(loc => {
        return {
            internalId: loc.id,
            id: loc.waawId,
            locationName: loc.name,
            creationDate: loc.creationDate,
            timezone: loc.timezone,
            activeEmployees: loc.activeEmployees + '',
            inactiveEmployees: loc.inactiveEmployees + '',
            status: {
                text: loc.active ? 'ACTIVE' : 'DISABLED',
                displayType: 'bg',
                status: loc.active ? 'ok' : 'bad'
            }
        }
    });
}

/**
 * @param {*} value value from state to be checked
 * @param {*} name name of field to be checked
 * @param {*} errorFunction function to set Error Info
 * @return true if error
 * */
export const validateForEmptyField = (value, name, errorFunction, condition) => {
    if (value === '' && condition) {
        errorFunction({
            message: `${name} is required`,
            show: true
        })
        return true;
    }
}

// Response -----------------

/**
 * @param {*} fetchFunction function to be called to fetch data
 * @param {*} successMessage Message to be shown in case of success
 * @param {*} loadingFunc setLoading function to be used to disable buttons
 * @param {*} reloadFunc reload function to be used to reload data on success
 * @param {*} pageLoaderFunc setPageLoading fuction to be used to coontrol page loader
 * @param {*} onCancel onCancel function to clear all state values to clear form
 * @param {*} showModal setShowModal function to hide the modal on success
 * @param {*} setToaster setToaster function to update info to be shown on success or error toaster
 */
export const fetchAndHandle = (fetchFunction, successMessage, loadingFunc, reloadFunc,
    pageLoaderFunc, onCancel, showModal, setToaster) => {
    pageLoaderFunc && pageLoaderFunc(true);
    loadingFunc && loadingFunc(true);
    fetchFunction()
        .then(res => {
            if (res.error) {
                setToaster && setToaster({
                    error: true,
                    title: "Error!",
                    message: res.message,
                })
                loadingFunc && loadingFunc(false);
                pageLoaderFunc && pageLoaderFunc(false);
            } else {
                setToaster && setToaster({
                    error: false,
                    title: "Success!",
                    message: successMessage ? successMessage : res.message,
                })
                onCancel && onCancel();
                loadingFunc && loadingFunc(false);
                reloadFunc && reloadFunc(true);
                showModal && showModal(false);
            }
        })
        .catch(() => {
            pageLoaderFunc && pageLoaderFunc(true);
            loadingFunc && loadingFunc(true);
        })
}

/**
 * @param {*} fetchFunction function to be called to fetch data
 * @param {*} setData setData method for the data to be shown
 * @param {*} setTotalEntries set function for pagination entries
 * @param {*} setTotalPages set function for pagination pages
 * @param {*} loaderFunction setPageLoading fuction to be used to coontrol page loader
 * @param {*} toasterFunction setToaster function to update info to be shown on success or error toaster
 * @param {*} mapperFunction function to map api response to required data
 * @param {*} userRole role for the loggedIn user
 */
export const fetchAndHandlePage = (fetchFunction, setData, setTotalEntries, setTotalPages,
    loaderFunction, toasterFunction, mapperFunction, userRole) => {
    loaderFunction && loaderFunction(true);
    fetchFunction()
        .then(res => {
            if (res.error) {
                toasterFunction && toasterFunction({
                    error: true,
                    title: "Error!",
                    message: res.message,
                })
            } else {
                setData(mapperFunction(res.data, userRole));
                setTotalEntries(res.totalEntries);
                setTotalPages(res.totalPages);
            }
            loaderFunction && loaderFunction(false);
        })
        .catch(() => loaderFunction && loaderFunction(false));
}

export const fetchAndHandleGet = (fetchFunction, setData) => {
    fetchFunction()
        .then(res => {
            if (!res.error) setData(res);
        })
}