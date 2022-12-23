import { useEffect, useState, useRef } from "react";
import { add, eachDayOfInterval, startOfWeek, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, isToday, parse, parseISO, startOfToday } from "date-fns";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { CalendarStyles } from "../../styles/elements";
import { DaysOfWeekShort } from "../../constants";
import DashboardCard from "./DashboardCard";

let events= [
    {
        id: 1,
        startDatetime: "2022-11-11T13:00",
        endDatetime: "2022-11-11T14:30",
        name: "Waaw meeting",
      
    },
    {
        id: 2,
        startDatetime: "2022-11-11T13:00",
         endDatetime: "2022-11-11T14:30",
        name: "Pragra meeting",
   
    },
    {
        id: 3,
        startDatetime: "2022-11-11T13:00",
         endDatetime: "2022-11-11T14:30",
        name: "Client meeting",

    },
    {
        id: 4,
        startDatetime: "2022-11-11T13:00",
         endDatetime: "2022-11-11T14:30",
        name: "Investors meeting",
    
    }
    
];

const holidays = [
    {
        id: 1,
        name: "Diwali",
        startDatetime: "2022-11-11T13:00",
        endDatetime: "2022-11-11T14:30",
        type: "org",
    },
    {
        id: 2,
        name: `Founder's Day`,
        startDatetime: "2022-12-20T09:00",
        endDatetime: "2022-12-20T11:30",
        type: "org",
    },
    {
        id: 3,
        name: "Holi",
        startDatetime: "2022-12-20T17:00",
        endDatetime: "2022-12-20T18:30",
        type: "public",
    },
    {
        id: 4,
        name: "St. Peter day",
        startDatetime: "2022-12-10T13:00",
        endDatetime: "2022-12-10T14:30",
        type: "public",
    },
    {
        id: 5,
        name: "Christmas",
        startDatetime: "2022-12-13T14:00",
        endDatetime: "2022-12-13T14:30",
        type: "public",
    },
];

const workingDays = [
    {
        id: 1,
        startDatetime: "2022-12-05T13:00",
        endDatetime: "2022-12-05T14:30",
    },
    {
        id: 2,
        startDatetime: "2022-12-08T13:00",
        endDatetime: "2022-12-08T14:30",
    },
    {
        id: 3,
        startDatetime: "2022-12-20T22:00",
    },
    {
        id: 4,
        endDatetime: "2022-12-21T02:00",
    },
];

const CalendarComponent = () => {
    const today = startOfToday();
    const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
    const [firstDayCurrentMonth, setFirstDayCurrentMonth] = useState(parse(currentMonth, "MMM-yyyy", new Date()));
    const [disableNext, setDisableNext] = useState(false);
    const [dayHeight, setDayHeight] = useState(0);
    const [referenceDays, setReferenceDays] = useState(
        eachDayOfInterval({
            start: startOfWeek(firstDayCurrentMonth),
            end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
        }).map((date) => {
            return { date: date };
        })
    );
    const [days, setDays] = useState(referenceDays);
    const [eventArr,setEventArr] = useState([])
    const dayRef = useRef();

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

    const classNames = (...classes) => {
        return classes.filter(Boolean).join(" ");
    };

    useEffect(() => {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
        if (format(firstDayNextMonth, "yyyy") <= format(firstDayCurrentMonth, "yyyy")) {
            setDisableNext(false);
        } else {
            setDisableNext(true);
        }
    }, [currentMonth]);

    useEffect(() => {
        let newDaysObj = referenceDays.map((day) => {
            let workedDaysList = [];
            workingDays
                .filter((workingDay) => isSameDay(parseISO(workingDay.startDatetime), day.date))
                .map((workingDay) =>
                    workedDaysList.push({
                        type: "In",
                        time: workingDay.startDatetime.split("T")[1],
                    })
                );
            workingDays
                .filter((workingDay) => isSameDay(parseISO(workingDay.endDatetime), day.date))
                .map((workingDay) =>
                    workedDaysList.push({
                        type: "Out",
                        time: workingDay.endDatetime.split("T")[1],
                    })
                );
            if (workedDaysList.length > 0) {
                return {
                    ...day,
                    worked: workedDaysList,
                    publicHoliday: holidays.filter(holiday => holiday.type === "public").some(holiday => (isSameDay(parseISO(holiday.startDatetime), day.date))),
                    organizationHoliday: holidays.filter(holiday => holiday.type === "org").some(holiday => (isSameDay(parseISO(holiday.startDatetime), day.date)))
                };
            }
            return day;
        });
        newDaysObj = newDaysObj.map((day) => {
            return {
                ...day,
                publicHoliday: holidays.filter(holiday => holiday.type === "public").some(holiday => (isSameDay(parseISO(holiday.startDatetime), day.date))),
                organizationHoliday: holidays.filter(holiday => holiday.type === "org").some(holiday => (isSameDay(parseISO(holiday.startDatetime), day.date)))
            };
        });
        setDays(newDaysObj);
    }, [referenceDays]);

    useEffect(() => {
        if (dayRef.current) {
            setDayHeight(dayRef.current.clientWidth);
        }
    }, [dayRef.current]);
// for event data ////
    useEffect(() => {
        let newArr = []
        let newdate = {}
        events.map((item)=>(
            newdate.inTime = item.startDatetime.slice(11),
            newdate.outTime = item.endDatetime.slice(11),
            newdate.name = item.name,
            newArr.push(newdate)
           
      ))
      setEventArr(newArr)
    },[referenceDays])

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
                                    ref={dayRef}
                                    style={{ height: `${dayHeight}px` }}
                                    className={classNames(
                                        CalendarStyles.dateContainer,
                                        CalendarStyles.dateInMonths,
                                        day.publicHoliday && CalendarStyles.publicHoliday,
                                        day.organizationHoliday && CalendarStyles.organizationHoliday
                                    )}
                                >
                                    <time
                                        dateTime={format(day.date, "yyyy-MM-dd")}
                                        className={classNames(
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
                        <p>Holidays</p>
                    </div>
                    <div className={CalendarStyles.event}>
                        <div className={`${CalendarStyles.eventBullet} ${CalendarStyles.organizationHoliday}`}></div>
                        <p>Organization Holidays</p>
                    </div>
                </div>
            </DashboardCard>
            <div className={CalendarStyles.holidaysAndEventsContainer}>
                <div className={CalendarStyles.eventsContainer}>
                    <h4>Events</h4>                
                    {eventArr && eventArr.map((event, i) => (
                       <div key={i} >
                        <p>{event.name}</p>
                         <div className={CalendarStyles.eventTimeDuration}>  
                         <span>In Time: {event.inTime}</span>
                         <span>Out Time: {event.outTime}</span>
                         </div>
                       </div>
                    ))}              
                </div>
            <div className={CalendarStyles.holidayContainer}>
                <h4>Holidays</h4>
                <ul className={CalendarStyles.holidayList}>
                    {holidays.map((holiday, i) => (
                        <li className={CalendarStyles.dateHoliday}>
                            {holiday.name}: {holiday.startDatetime}
                        </li>
                    ))}
                </ul>
            </div>
            </div>
        </div>
    );
};

export default CalendarComponent;
