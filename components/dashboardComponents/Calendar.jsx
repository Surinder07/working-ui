import { useEffect, useState, useRef } from "react";
import { add, eachDayOfInterval, startOfWeek, endOfMonth, endOfWeek, format, getDay, isEqual, isSameDay, isSameMonth, isToday, parse, parseISO, startOfToday } from "date-fns";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import styles from "../../styles/pages/Dashboard.module.css";

const meetings = [
  {
    id: 1,
    name: "Leslie Alexander",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    start: "1:00 PM",
    startDatetime: "2022-01-21T13:00",
    end: "2:30 PM",
    endDatetime: "2022-01-21T14:30",
  },
  // More meetings...`
];

function classNames(...classes) {
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
      <div className={styles.calenderContainer}>
        <div className={styles.innerCalenderContainer}>
          <div className={styles.calenderHeader}>
            <button type="button" onClick={previousMonth} className={styles.calenderPrevBtn}>
              <ArrowLeftIcon className={styles.arrowIcon} aria-hidden="true" />
            </button>
            <h2>{format(firstDayCurrentMonth, "MMMM yyyy")}</h2>
            <button type="button" onClick={nextMonth} className={styles.calenderNextBtn}>
              <ArrowRightIcon className={styles.arrowIcon} aria-hidden="true" />
            </button>
          </div>
          <div className={styles.calenderContent}>
            <div className={styles.days}>Sunday</div>
            <div className={styles.days}>Monday</div>
            <div className={styles.days}>Tuesday</div>
            <div className={styles.days}>Wednesday</div>
            <div className={styles.days}>Thursday</div>
            <div className={styles.days}>Friday</div>
            <div className={styles.days}>Saturday</div>
          </div>
          <div className={styles.datesContainer}>
            {days.map((day, dayIdx) => (
              <div
                key={day.toString()}
                onClick={() => setSelectedDay(day)}
                ref={dayRef}
                style={{ height: `${dayHeight}px` }}
                className={classNames(
                  styles.dateContainer,
                  styles.dateInMonths,
                  isEqual(day, selectedDay) && isToday(day) && styles.todayDateCurrMonth,
                  isEqual(day, selectedDay) && !isToday(day) && styles.notTodayDateCurrMonth
                )}
              >
                <button
                  type="button"
                  className={classNames(
                    isEqual(day, selectedDay) && styles.textWhite,
                    !isEqual(day, selectedDay) && isToday(day) && styles.todayDate,
                    !isEqual(day, selectedDay) && !isToday(day) && isSameMonth(day, firstDayCurrentMonth) && styles.notTodayDate,
                    !isEqual(day, selectedDay) && !isToday(day) && !isSameMonth(day, firstDayCurrentMonth) && styles.notInActiveMonth,
                    styles.dateBtn
                  )}
                >
                  <time dateTime={format(day, "yyyy-MM-dd")}>{format(day, "d")}</time>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.events}>
        <div className={styles.event}>
          <div className={styles.holidayEvent}></div>
          <p>Organization Holidays</p>
        </div>
      </div>
    </>
  );
};

export default CalenderComponent;
