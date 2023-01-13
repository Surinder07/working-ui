import { useEffect, useState } from "react";
import { add, eachDayOfInterval, startOfWeek, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, isEqual, isToday, parse, parseISO, startOfToday, getMonth, getYear } from "date-fns";
import { ArrowLeft, ArrowRight, PropaneSharp } from "@mui/icons-material";
import { CalendarStyles } from "../../styles/elements";
import { DaysOfWeekShort } from "../../constants";
import DashboardCard from "./DashboardCard";
import { joinClasses } from "../../helpers";
import { calendarService } from '../../services';

const CalendarComponent = (props) => {

    // -------------- Data to display
    const [holidays, setHolidays] = useState([]);
    const [timesheets, setTimesheets] = useState([]);
    const [selectedEvents, setSelectedEvents] = useState([]);
    // ------------------------------

    const today = startOfToday();
    const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
    const [currentYear, setCurrentYear] = useState();
    const [firstDayCurrentMonth, setFirstDayCurrentMonth] = useState(parse(currentMonth, "MMM-yyyy", new Date()));
    const [disableNext, setDisableNext] = useState(false);
    const [referenceDays, setReferenceDays] = useState(
        eachDayOfInterval({
            start: startOfWeek(firstDayCurrentMonth),
            end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
        }).map((date) => {
            return { date: date };
        })
    );
    const [days, setDays] = useState(referenceDays);
    const [selectedDay, setSelectedDay] = useState(today);

    const previousMonth = () => {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
        setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
        updateDays(format(firstDayNextMonth, "MMM-yyyy"));
    };

    const nextMonth = () => {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
        if (!disableNext) {
            setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
            updateDays(format(firstDayNextMonth, "MMM-yyyy"));
        }
    };

    const updateDays = (current) => {
        const firstDay = parse(current, "MMM-yyyy", new Date());
        setFirstDayCurrentMonth(firstDay);
        setReferenceDays(
            eachDayOfInterval({
                start: startOfWeek(firstDay),
                end: endOfWeek(endOfMonth(firstDay)),
            }).map((date) => {
                return { date: date };
            })
        );
    };

    const getDaysEvent = (day) => {
        calendarService.getEvents(format(day, "yyyy-MM-dd"))
            .then(res => {
                if (!res.error) {
                    setSelectedEvents(res);
                }
            });
    }

    const getMonthTimesheet = (date) => {
        const month = getMonth(new Date(date)) + 1;
        const year = getYear(new Date(date));
        calendarService.getTimesheets(year, month)
            .then(res => {
                if (!res.error) {
                    setTimesheets(res);
                }
            })
    }

    const getHolidays = (date) => {
        const year = getYear(new Date(date));
        calendarService.getHolidays(year)
            .then(res => {
                if (!res.error) {
                    setHolidays(res);
                }
            })
    }

    useEffect(() => {
        setSelectedDay(today);
    }, [])

    useEffect(() => {
        getDaysEvent(selectedDay);
    }, [selectedDay])

    useEffect(() => {
        if (!isNaN(currentYear)) getHolidays(currentYear);
    }, [currentYear])

    useEffect(() => {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
        if (format(firstDayNextMonth, "yyyy") <= format(firstDayCurrentMonth, "yyyy")) {
            setDisableNext(false);
        } else {
            if (format(firstDayNextMonth, "yyyy") <= format(today, "yyyy")) {
                setDisableNext(false);
            } else {
                setDisableNext(true);
            }
        }
        getMonthTimesheet(currentMonth);
        if (currentYear !== getYear(new Date(firstDayCurrentMonth)).toString()) {
            setCurrentYear(getYear(new Date()).toString());
        }
    }, [currentMonth]);

    const getTimeFromDate = (date) => {
        let time = date.split("T")[1];
        return `${time.split(':')[0]}:${time.split(':')[1]}`
    }

    useEffect(() => {
        let newDaysObj = referenceDays.map((day) => {
            let workedDaysList = [];
            timesheets
                .filter((workingDay) => isSameDay(parseISO(workingDay.startDatetime), day.date))
                .map((workingDay) =>
                    workedDaysList.push({
                        type: "In",
                        time: getTimeFromDate(workingDay.startDatetime),
                    })
                );
            timesheets
                .filter((workingDay) => isSameDay(parseISO(workingDay.endDatetime), day.date))
                .map((workingDay) =>
                    workedDaysList.push({
                        type: "Out",
                        time: getTimeFromDate(workingDay.endDatetime),
                    })
                );
            if (workedDaysList.length > 0) {
                return {
                    ...day,
                    worked: workedDaysList,
                    nationalHoliday: holidays.filter((holiday) => holiday.type === "NATIONAL_HOLIDAY").some((holiday) => isSameDay(parseISO(holiday.date), day.date)),
                    organizationHoliday: holidays.filter((holiday) => holiday.type === "ORGANIZATION_HOLIDAY").some((holiday) => isSameDay(parseISO(holiday.date), day.date)),
                };
            }
            return day;
        });
        newDaysObj = newDaysObj.map((day) => {
            return {
                ...day,
                nationalHoliday: holidays.filter((holiday) => holiday.type === "NATIONAL_HOLIDAY").some((holiday) => isSameDay(parseISO(holiday.date), day.date)),
                organizationHoliday: holidays.filter((holiday) => holiday.type === "ORGANIZATION_HOLIDAY").some((holiday) => isSameDay(parseISO(holiday.date), day.date)),
            };
        });
        setDays(newDaysObj);
    }, [referenceDays, holidays, timesheets]);

    return (
        <div className={CalendarStyles.gridContainer}>
            <DashboardCard>
                <div className={CalendarStyles.calenderContainer}>
                    <div className={CalendarStyles.innerCalenderContainer}>
                        <div className={CalendarStyles.dateNav}>
                            <ArrowLeft className={CalendarStyles.arrowIcon} onClick={previousMonth} />
                            <h2>{format(firstDayCurrentMonth, "yyyy MMMM")}</h2>
                            <ArrowRight className={`${CalendarStyles.arrowIcon} ${disableNext && CalendarStyles.disabledIcon}`} onClick={nextMonth} />
                        </div>
                        <div className={CalendarStyles.daysContainer}>
                            {DaysOfWeekShort.map((day, i) => (
                                <div className={CalendarStyles.days} key={`dayName_${i}`}>
                                    {day}
                                </div>
                            ))}
                        </div>
                        <div className={CalendarStyles.datesContainer}>
                            {days.map((day, i) => (
                                <div
                                    key={`day_${i}`}
                                    onClick={() => {
                                        if (isSameMonth(day.date, firstDayCurrentMonth)) setSelectedDay(day.date);
                                    }}
                                    className={joinClasses(
                                        CalendarStyles.dateContainer,
                                        CalendarStyles.dateInMonths,
                                        isEqual(day.date, selectedDay) && CalendarStyles.selectedDate,
                                        day.nationalHoliday && CalendarStyles.publicHoliday,
                                        day.organizationHoliday && CalendarStyles.organizationHoliday
                                    )}
                                >
                                    <time
                                        dateTime={format(day.date, "yyyy-MM-dd")}
                                        className={joinClasses(
                                            CalendarStyles.dateValue,
                                            isToday(day.date) && CalendarStyles.todayDate,
                                            !isToday(day.date) && isSameMonth(day.date, firstDayCurrentMonth) && CalendarStyles.notTodayDate,
                                            !isToday(day.date) && !isSameMonth(day.date, firstDayCurrentMonth) && CalendarStyles.notActiveMonth
                                        )}
                                    >
                                        {format(day.date, "d")}
                                    </time>
                                    {day.worked && day.worked.length > 0 && (
                                        <div className={CalendarStyles.dateData}>
                                            {day.worked.map((workedDay, j) => (
                                                <p key={`work_${j}`}>{`${workedDay.type} Time: ${workedDay.time}`}</p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={CalendarStyles.events}>
                    <div className={CalendarStyles.event}>
                        <div className={`${CalendarStyles.eventBullet} ${CalendarStyles.publicHoliday}`}></div>
                        <p>National Holidays</p>
                    </div>
                    <div className={CalendarStyles.event}>
                        <div className={`${CalendarStyles.eventBullet} ${CalendarStyles.organizationHoliday}`}></div>
                        <p>Organization Holidays</p>
                    </div>
                    <div className={CalendarStyles.event}>
                        <div className={`${CalendarStyles.eventBullet} ${CalendarStyles.selectedDate}`}></div>
                        <p>Selected Day</p>
                    </div>
                </div>
            </DashboardCard>
            <div className={CalendarStyles.holidaysAndEventsContainer}>
                <div className={CalendarStyles.eventsContainer}>
                    <h4>{selectedDay.toLocaleString('default', { month: 'long', day: 'numeric', year: "numeric" })}</h4>
                    <ul className={CalendarStyles.eventList}>
                        {
                            selectedEvents.length > 0 ?
                                selectedEvents.map((event, i) => (
                                    <li className={CalendarStyles.dateHoliday} key={`event_${i}`}>
                                        <span className={CalendarStyles.eventTitle}>{event.name}</span>: {event.time}
                                    </li>
                                )) :
                                <li className={CalendarStyles.dateHoliday}>No Data Available</li>
                        }
                    </ul>
                </div>
                <div className={CalendarStyles.holidayContainer}>
                    <h4>Holidays</h4>
                    <ul className={CalendarStyles.holidayList}>
                        {
                            holidays.length > 0 ?
                                holidays.map((holiday, i) => (
                                    <li className={CalendarStyles.dateHoliday} key={`holiday${i}`}>
                                        <span className={CalendarStyles.eventTitle}>{holiday.name}</span>: {holiday.displayDate}
                                    </li>
                                )) :
                                <li className={CalendarStyles.dateHoliday}>No Data Available</li>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CalendarComponent;
