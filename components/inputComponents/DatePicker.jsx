import { DatePickerStyles } from '../../styles/elements';
import { CalendarMonth } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import {
    add,
    eachDayOfInterval,
    startOfWeek,
    endOfMonth,
    endOfWeek,
    format,
    isSameDay,
    isSameMonth,
    isToday,
    parse,
    parseISO,
    startOfToday,
    differenceInDays
} from "date-fns";

const DatePicker = (props) => {

    const ref = useRef();
    const today = startOfToday();
    const [noSelected, setNoSelected] = useState(true);
    const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
    const [firstDayCurrentMonth, setFirstDayCurrentMonth] = useState(parse(currentMonth, "MMM-yyyy", new Date()));
    const [referenceDates, setReferenceDates] = useState(eachDayOfInterval({
        start: startOfWeek(firstDayCurrentMonth),
        end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
    }).map(date => { return { date: date } }));
    const [dates, setDates] = useState(referenceDates);
    const [open, setOpen] = useState(false);
    const [openDown, setOpenDown] = useState(true);
    const [inputHeight, setInputHeight] = useState(0);
    const [calendarHeight, setCalendarHeight] = useState(0);

    const openedDownStyle = {
        top: '32px',
        left: '50%',
        transform: 'translateX(-50%)'
    }

    const openedUpStyle = {
        bottom: 0,
        left: '50%',
        transform: `translate(-50%, -${inputHeight}px)`
    }

    const openStyle = {
        height: `${calendarHeight}px`
    }

    const closeStyle = {
        height: 0,
        border: 'none'
    }

    const isTodayOrPast = (date) => {
        return differenceInDays(date, today) < 0;
    }

    const previousMonth = () => {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
        setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
        updateDays(format(firstDayNextMonth, "MMM-yyyy"));
    }

    const nextMonth = () => {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
        setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
        updateDays(format(firstDayNextMonth, "MMM-yyyy"));
    }

    const previousYear = () => {
        let firstDayNextMonth = add(firstDayCurrentMonth, { years: -1 });
        setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
        updateDays(format(firstDayNextMonth, "MMM-yyyy"));
    }

    const nextYear = () => {
        let firstDayNextMonth = add(firstDayCurrentMonth, { years: 1 });
        setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
        updateDays(format(firstDayNextMonth, "MMM-yyyy"));
    }

    const updateDays = (current) => {
        const firstDay = parse(current, "MMM-yyyy", new Date());
        setFirstDayCurrentMonth(firstDay);
        setReferenceDates(eachDayOfInterval({
            start: startOfWeek(firstDay),
            end: endOfWeek(endOfMonth(firstDay)),
        }).map(date => { return { date: date } }))
    }

    const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            setOpen(false);
        }
    }

    const onClick = () => {
        if ((ref.current.offsetTop + (calendarHeight) + ref.current.clientHeight) > window.innerHeight)
            setOpenDown(false);
        if ((ref.current.offsetTop - window.scrollY < (calendarHeight)))
            setOpenDown(true);
        setOpen(!open);
    }

    const handleValueChange = (date) => {
        if (props.blockPast && isTodayOrPast(parseISO(date))) {
            return;
        }
        if (isSameMonth(parseISO(date), firstDayCurrentMonth)) {
            props.setValue(date);
            setNoSelected(false);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [])

    useEffect(() => {
        setInputHeight(ref.current.clientHeight);
    }, [ref]);

    useEffect(() => {
            let newDatesObj = referenceDates.map((date) => {
                return {
                    ...date,
                    selected: noSelected ? false : isSameDay(parseISO(props.value), date.date),
                    today: isToday(date.date),
                    currentMonth: isSameMonth(date.date, firstDayCurrentMonth)
                }
            })
            setDates(newDatesObj);
            const height = newDatesObj.length > 35 ? 180 : 150;
            setCalendarHeight(height + 60);
    }, [referenceDates, props.value, firstDayCurrentMonth]);

    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    return (
        <div ref={ref} className={`${DatePickerStyles.container} ${props.error ? DatePickerStyles.error : DatePickerStyles.default}`}>
            <input type='text' placeholder='yyyy-MM-dd' value={props.value} disabled onFocus={() => setOpen(true)} />
            <CalendarMonth className={DatePickerStyles.icon} onClick={onClick} />
            <div className={`${DatePickerStyles.calendar}`}
                style={{ ...openDown ? openedDownStyle : openedUpStyle, ...open ? openStyle : closeStyle }}>
                <div className={DatePickerStyles.dateNav}>
                    <div className={DatePickerStyles.childNav}>
                        <ArrowLeft className={DatePickerStyles.arrowIcon} onClick={previousMonth} />
                        {format(firstDayCurrentMonth, "MMMM")}
                        <ArrowRight className={DatePickerStyles.arrowIcon} onClick={nextMonth} />
                    </div>
                    <div className={DatePickerStyles.childNav}>
                        <ArrowLeft className={DatePickerStyles.arrowIcon} onClick={previousYear} />
                        {format(firstDayCurrentMonth, "yyyy")}
                        <ArrowRight className={DatePickerStyles.arrowIcon} onClick={nextYear} />
                    </div>
                </div>
                <div className={DatePickerStyles.daysContainer}>
                    {
                        days.map((day, i) => (
                            <p className={DatePickerStyles.days} key={`days_${i}`}>{day}</p>
                        ))
                    }
                </div>
                <div className={DatePickerStyles.datesContainer}>
                    {
                        dates.map((date, i) => (
                            <p key={`date_${i}`} className={`
                                ${DatePickerStyles.dates}
                                ${((!date.today && !date.currentMonth) || (props.blockPast && isTodayOrPast(date.date))) && DatePickerStyles.notActiveMonth}
                                ${date.selected && DatePickerStyles.selectedDate}
                                ${date.today && DatePickerStyles.todayDate}
                            `}
                                onClick={() => handleValueChange(format(date.date, "yyyy-MM-dd"))}>
                                <time dateTime={format(date.date, "yyyy-MM-dd")}>
                                    {format(date.date, "d")}
                                </time>
                                {
                                    date.today && !date.selected &&
                                    <span className={DatePickerStyles.todayMarker}></span>
                                }
                            </p>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default DatePicker;