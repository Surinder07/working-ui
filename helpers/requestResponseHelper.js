// Requests -----------------
export const saveUserRequestBody = (firstName, lastName, locationRoleId, locationId,
    employeeId, email, isFullTime) => {
    return {
        firstName, lastName, locationRoleId, locationId, employeeId, email, isFullTime
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
    minHoursBetweenShifts, maxConsecutiveWorkDays, admin) => {
    return { locationId, name, totalHoursPerDayMin, totalHoursPerDayMax, minHoursBetweenShifts, maxConsecutiveWorkDays, admin }
}

export const getRoleListing = (data, auth) => {
    return data.map(role => {
        return auth === 'ADMIN' ? {
            internalId: role.id,
            id: role.waawId,
            roleName: role.name,
            location: role.location,
            admin: role.admin.toString(),
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

export const getNotificationListing = (data) => {
    return data.map(notification => {
        return {
            internalId: notification.id,
            title: notification.title,
            type: notification.type,
            date: notification.createdTime,
            status: {
                text: notification.read ? 'Read' : 'Unread',
                status: notification.read ? 'ok' : 'warn',
                displayType: 'color'
            },
            subData: [{
                summary: notification.description
            }]
        }
    })
}

export const getNotificationListingForBell = (data) => {
    return data.map(notification => {
        return {
            internalId: notification.id,
            title: notification.title,
            type: notification.type,
            date: notification.createdTime,
            read: notification.read,
            message: notification.description
        }
    })
}

export const getShiftsListing = (data) => {
    const getShiftStatusColor = (status) => {
        if (status === 'FAILED') return 'bad';
        else if (status === 'CONFLICT' || status === 'CREATING') return 'warn';
        else return 'ok';
    }

    const mapSubData = (subData) => {
        return {
            internalId: subData.id,
            // employeeId: subData.employeeId,
            employeeName: subData.employeeName,
            employeeEmail: subData.employeeEmail,
            location: subData.locationName,
            role: subData.locationRoleName,
            inTime: subData.start.date + " " + subData.start.time,
            outTime: subData.end.date + " " + subData.end.time,
            comments: {
                displayType: 'comment',
                text: subData.notes
            },
            status: {
                text: subData.shiftStatus,
                status: getShiftStatusColor(subData.shiftStatus),
                displayType: 'bg'
            }
        }
    }
    return data.map(batch => {
        return {
            internalId: batch.id,
            shiftId: batch.waawId,
            shiftName: batch.name ? batch.name : '-',
            startDate: batch.startDate,
            endDate: batch.endDate,
            creationDate: batch.creationDate,
            status: {
                text: batch.status,
                status: getShiftStatusColor(batch.status),
                displayType: 'bg'
            },
            subData: batch.shifts ? batch.shifts.map(shift => mapSubData(shift)) : []
        }
    })
}

export const getSingleShiftsListing = (data, role) => {
    return data.map(shift => {
        return (role && role === 'MANAGER') ? {
            internalId: shift.id,
            id: shift.waawId,
            shiftName: shift.name,
            employeeName: shift.employeeName,
            employeeEmail: shift.employeeEmail,
            inTime: shift.start.date + " " + shift.start.time,
            outTime: shift.end.date + " " + shift.end.time,
            comments: {
                displayType: 'comment',
                text: shift.notes
            }
        } : {
            internalId: shift.id,
            id: shift.waawId,
            shiftName: shift.name,
            inTime: shift.start.date + " " + shift.start.time,
            outTime: shift.end.date + " " + shift.end.time,
            comments: {
                displayType: 'comment',
                text: shift.notes
            }
        }
    })
}

export const getTimesheetListing = (data) => {
    return data.map(timesheet => {
        return {
            internalId: timesheet.id,
            start: timesheet.start ? timesheet.start.date + " " + timesheet.start.time : '-',
            end: timesheet.end ? timesheet.end.date + " " + timesheet.end.time : '-',
            duration: timesheet.duration ? timesheet.duration : '-',
            type: timesheet.type,
            comments: {
                displayType: 'comment',
                text: timesheet.comment
            }
        }
    })
}

export const getRequestsListing = (data) => {
    const getHistoryList = (history) => {
        return history.map(hist => {
            return {
                title: hist.title,
                description: hist.description,
                date: hist.date,
                status: hist.status === 'DENIED' ? 'bad' : (hist.status === 'ACCEPTED' ? 'ok' :
                    (hist.status === 'NEW' ? 'warn' : 'basic'))
            }
        })
    }

    const getRequestType = (type, subType) => {
        if (type === 'INFORMATION_UPDATE') return 'Information Update';
        else if (type === 'OVERTIME') return 'Overtime';
        else if (subType === 'VACATION_LEAVE_FULL_DAY' || subType === 'VACATION_LEAVE_HALF_DAY') {
            return 'Timeoff (Vacation)';
        } else return 'Timeoff (Sick)';
    }

    return data.map(request => {
        return {
            internalId: request.id,
            id: request.waawId,
            requestType: getRequestType(request.type, request.subType),
            initiationDate: request.createdDate,
            location: request.location,
            initiatedBy: request.raisedBy,
            assignedTo: request.assignedTo,
            status: {
                text: request.status,
                displayType: 'bg',
                status: request.status === 'DENIED' ? 'bad' : (request.status === 'ACCEPTED' ? 'ok' : 'warn')
            },
            history: getHistoryList(request.history)
        }
    })
}

export const getReportListing = (data, role) => {
    return data.map(report => {
        return role === 'ADMIN' ? {
            internalId: report.id,
            id: report.waawId,
            location: report.locationName,
            reportFrom: report.from,
            reportTo: report.to,
            generatedOn: report.createdOn
        } : {
            internalId: report.id,
            id: report.waawId,
            reportFrom: report.from,
            reportTo: report.to,
            generatedOn: report.createdOn
        }
    })
}

export const getPaymentListing = (data) => {
    return data.map(payment => {
        return {
            internalId: payment.id,
            invoiceId: payment.invoiceId,
            transactionId: payment.transactionId,
            description: `${payment.quantity} x ${payment.unitPrice}`,
            total: `${payment.totalAmount} ${payment.currency}`,
            type: payment.transactionType.replace('_', ' '),
            invoiceDate: payment.invoiceDate,
            invoiceFor: payment.dateRange,
            dueDate: payment.dueDate,
            paymentDate: payment.paymentDate,
            status: {
                text: payment.paymentStatus,
                displayType: 'bg',
                status: payment.paymentStatus === 'FAILED' ? 'bad' : (payment.paymentStatus === 'PAID' ? 'ok' : 'warn')
            }
        }
    })
}

export const newShiftRequestBody = (formType, locationId, roleIds, userIds, startDate, startTime,
    endDate, endTime, instantRelease, shiftName) => {
    return {
        type: formType === 'Single Shift' ? 'SINGLE' : 'BATCH',
        locationId, userIds: userIds === '' ? [] : userIds, shiftName,
        locationRoleIds: roleIds === '' ? [] : roleIds,
        start: { date: startDate, time: formatTime(startTime) },
        end: { date: endDate, time: formatTime(endTime) },
        instantRelease
    }
}

export const newRequestRequestBody = (requestType, timeOffFormType, fromDate, tillDate, typeOfLeave,
    startTime, duration, description) => {
    const getSubtype = () => {
        if (timeOffFormType === 'Full Day' && typeOfLeave === 'Vacation') return 'VACATION_LEAVE_FULL_DAY';
        else if (typeOfLeave === 'Vacation') return 'VACATION_LEAVE_HALF_DAY';
        else if (timeOffFormType === 'Half Day' && typeOfLeave === 'Sick Leave') return 'SICK_LEAVE_HALF_DAY';
        else return 'SICK_LEAVE_FULL_DAY';
    }
    let req = {
        type: requestType,
        start: fromDate === '' ? null : {
            date: fromDate,
            time: startTime === '' ? null : formatTime(startTime)
        },
        endDate: tillDate,
        duration: duration,
        description: description
    }
    if (requestType === 'TIME_OFF') {
        req = { ...req, subType: getSubtype() }
    }
    return req;
}

export const updatePreferenceRequestBody = (data, id) => {
    let tempObj = {};
    data.rowsData.map(row => {
        const startKey = `${row.days.toLowerCase()}StartTime`
        const endKey = `${row.days.toLowerCase()}EndTime`
        tempObj[startKey] = row.working ? `${row.startTime.hours}:${row.startTime.minutes}` : null;
        tempObj[endKey] = row.working ? `${row.endTime.hours}:${row.endTime.minutes}` : null;
    })
    return {
        ...tempObj,
        userId: id,
        wagesPerHour: data.wagesPerHour,
        wagesCurrency: data.wagesCurrency,
    }
}

export const getUpdateMemberRequestBody = (firstName, lastName, mobile, location, role, employeeType,
    employeeId, userId) => {
    return {
        id: userId,
        firstName,
        lastName,
        employeeId,
        countryCode: mobile.countryCode,
        mobile: mobile.mobile,
        country: mobile.country,
        locationId: location,
        roleId: role,
        fullTime: employeeType === 'Full Time'
    }
}

const formatTime = (time) => {
    return time && time.hours ? time.hours.toString().padStart(2, "0") + ':' + time.minutes.toString().padStart(2, "0") : null;
}

/**
 * @param {*} value value from state to be checked
 * @param {*} name name of field to be checked
 * @param {*} errorFunction function to set Error Info
 * @param {*} condition additional condition needs to be check or true
 * @return true if error
 * */
export const validateForEmptyField = (value, name, errorFunction, condition, message) => {
    if (value === '' && condition) {
        errorFunction({
            message: message ? message : `${name} is required`,
            show: true
        })
        return true;
    } else return false;
}

/**
 * @param {*} value value from state to be checked
 * @param {*} name name of field to be checked
 * @param {*} errorFunction function to set Error Info
 * @param {*} condition additional condition needs to be check or true
 * @return true if error
 */
export const validateForEmptyArray = (value, name, errorFunction, condition) => {
    if (value.length === 0 && condition) {
        errorFunction({
            message: `${name} is required`,
            show: true
        })
        return true;
    } else return false;
}

/**
 * @param {*} value value from state to be checked
 * @param {*} errorFunction function to set Error Info
 * @param {*} condition additional condition needs to be check or true
 * @return true if error
 */
export const validateForTime = (value, errorFunction, condition) => {
    if (((!value.hours && value.hours !== 0) || (!value.minutes && value.minutes !== 0)) && condition) {
        errorFunction({
            message: `Both Hours and minutes are required`,
            show: true
        })
        return true;
    } else return false;
}

export const validateForNumberNotZero = (value, name, errorFunction, condition) => {
    if (value === 0 && condition) {
        errorFunction({
            message: `${name} cannot be 0`,
            show: true
        })
        return true;
    } else return false;
}

export const combineBoolean = (...values) => {
    let res = false;
    values.map(value => {
        res = res || value;
    })
    return res;
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
 * @param {*} successFunc func to run on success
 * @param {*} errorFunc func to run on error
 */
export const fetchAndHandle = (fetchFunction, successMessage, loadingFunc, reloadFunc,
    pageLoaderFunc, onCancel, showModal, setToaster, successFunc, errorFunc) => {
    pageLoaderFunc && pageLoaderFunc(true);
    loadingFunc && loadingFunc(true);
    fetchFunction()
        .then(res => {
            if (res.error) {
                errorFunc ? errorFunc(res.message) : setToaster && setToaster({
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
                successFunc && successFunc();
                showModal && showModal(false);
                pageLoaderFunc && pageLoaderFunc(false);
            }
        })
        .catch((e) => {
            console.log(e)
            pageLoaderFunc && pageLoaderFunc(false);
            loadingFunc && loadingFunc(false);
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
                setTotalEntries && setTotalEntries(res.totalEntries);
                setTotalPages && setTotalPages(res.totalPages);
            }
            loaderFunction && loaderFunction(false);
        })
        .catch((e) => {
            console.log(e)
            loaderFunction && loaderFunction(false)
        });
}

export const fetchAndHandleGet = (fetchFunction, setData) => {
    fetchFunction()
        .then(res => {
            if (!res.error) setData(res);
        })
}