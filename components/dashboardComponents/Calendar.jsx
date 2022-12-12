import { useEffect, useState, useRef } from "react";
import { add, eachDayOfInterval, startOfWeek, endOfMonth, endOfWeek, format, getDay, isEqual, isSameDay, isSameMonth, isToday, parse, parseISO, startOfToday } from "date-fns";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { CalendarStyles } from "../../styles/elements";

const holidays = [
    {
        id: 1,
        startDatetime: "2022-11-11T13:00",
        endDatetime: "2022-11-11T14:30",
    },
    {
        id: 2,
        startDatetime: "2022-12-20T09:00",
        endDatetime: "2022-12-20T11:30",
    },
    {
        id: 3,
        startDatetime: "2022-12-20T17:00",
        endDatetime: "2022-12-20T18:30",
    },
    {
        id: 4,
        startDatetime: "2022-12-10T13:00",
        endDatetime: "2022-12-10T14:30",
    },
    {
        id: 5,
        startDatetime: "2022-12-13T14:00",
        endDatetime: "2022-12-13T14:30",
    },
];

const organizationHolidays = [
    {
        id: 1,
        startDatetime: "2022-12-30T13:00",
        endDatetime: "2022-12-30T14:30",
    },
];

const workingDays = [
    {
        id: 1,
        startDatetime: "2022-12-05T13:00",
        endDatetime: "2022-12-05T14:30",
    },
];

const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
}

const CalenderComponent = () => {
    const today = startOfToday();
    const [selectedDay, setSelectedDay] = useState(today);
    const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
    const [toggleNextBtn, setToggleNextBtn] = useState(true);
    const [dayHeight, setDayHeight] = useState(0);
    const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

    const dayRef = useRef();

    let days = eachDayOfInterval({
        start: startOfWeek(firstDayCurrentMonth),
        end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
    });

    function previousMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
        setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
    }

    function nextMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
        if (format(firstDayNextMonth, "yyyy") <= format(firstDayCurrentMonth, "yyyy")) {
            setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
        }
    }

    useEffect(() => {
        if (dayRef.current) {
            setDayHeight(dayRef.current.clientWidth);
        }
    }, [dayRef.current]);

    return (
        <>
            <div className={CalendarStyles.calenderContainer}>
                <div className={CalendarStyles.innerCalenderContainer}>
                    <div className={CalendarStyles.calenderHeader}>
                        <button type="button" onClick={previousMonth} className={CalendarStyles.calenderPrevBtn}>
                            <ArrowLeft className={CalendarStyles.arrowIcon} aria-hidden="true" />
                        </button>
                        <h2>{format(firstDayCurrentMonth, "MMMM yyyy")}</h2>
                        <button type="button" onClick={nextMonth} className={CalendarStyles.calenderNextBtn}>
                            <ArrowRight className={CalendarStyles.arrowIcon} aria-hidden="true" />
                        </button>
                    </div>
                    <div className={CalendarStyles.calenderContent}>
                        <div className={CalendarStyles.days}>Sunday</div>
                        <div className={CalendarStyles.days}>Monday</div>
                        <div className={CalendarStyles.days}>Tuesday</div>
                        <div className={CalendarStyles.days}>Wednesday</div>
                        <div className={CalendarStyles.days}>Thursday</div>
                        <div className={CalendarStyles.days}>Friday</div>
                        <div className={CalendarStyles.days}>Saturday</div>
                    </div>
                    <div className={CalendarStyles.datesContainer}>
                        {days.map((day, dayIdx) => (
                            <div
                                key={day.toString()}
                                ref={dayRef}
                                style={{ height: `${dayHeight}px` }}
                                className={classNames(
                                    CalendarStyles.dateContainer,
                                    CalendarStyles.dateInMonths,
                                    isEqual(day, selectedDay) && isToday(day) && CalendarStyles.todayDateCurrMonth,
                                    isEqual(day, selectedDay) && !isToday(day) && CalendarStyles.notTodayDateCurrMonth,
                                    holidays.some((holiday) => isSameDay(parseISO(holiday.startDatetime), day)) && CalendarStyles.holiday,
                                    organizationHolidays.some((holiday) => isSameDay(parseISO(holiday.startDatetime), day)) && CalendarStyles.organizationHoliday
                                )}
                            >
                                <button
                                    type="button"
                                    className={classNames(
                                        !isEqual(day, selectedDay) && isToday(day) && CalendarStyles.todayDate,
                                        !isEqual(day, selectedDay) && !isToday(day) && isSameMonth(day, firstDayCurrentMonth) && CalendarStyles.notTodayDate,
                                        !isEqual(day, selectedDay) && !isToday(day) && !isSameMonth(day, firstDayCurrentMonth) && CalendarStyles.notInActiveMonth,
                                        CalendarStyles.dateBtn
                                    )}
                                >
                                    <time dateTime={format(day, "yyyy-MM-dd")} className={CalendarStyles.dateValue}>
                                        {format(day, "d")}
                                    </time>
                                    {workingDays.some((workingDay) => isSameDay(parseISO(workingDay.startDatetime), day)) && (
                                        <div className={CalendarStyles.dateBtnContents}>
                                            <p>In Time: 9:45</p>
                                            <p>Out Time: 17:45</p>
                                        </div>
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.events}>
                <div className={styles.event}>
                    <div className={`${styles.eventBullet} ${styles.holiday}`}></div>
                    <p>Holidays</p>
                </div>
                <div className={styles.event}>
                    <div className={`${styles.eventBullet} ${styles.organizationHoliday}`}></div>
                    <p>Organization Holidays</p>
                </div>
            </div>
        </>
    );
};

export default CalenderComponent;
