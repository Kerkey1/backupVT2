//SESSION
import {PartOfMonthEnum} from "./constants/enums/PartOfMonthEnum";
import {MonthsEnum} from "./constants/enums/MonthsEnum";

export const getSession = () => JSON.parse(sessionStorage.getItem('currentSession'));
export const setSession = (session) => sessionStorage.setItem('currentSession', JSON.stringify(session));
export const sessionExist = () => !!getSession();

//translation

//TIMES
export const newEventDate = (currentDate, date, extraMonth) => new Date(currentDate.getFullYear(), currentDate.getMonth() + extraMonth, date);
export const compoundYears = (year, currentYear) => year < currentYear ? currentYear + 1 : currentYear - 1;
export const zeroBefore = (value) => value.toString().length === 1 ? "0" + value : value

export const getArrayForPartOfMonthEnum = (constant) => {
    switch (constant) {
        case PartOfMonthEnum.FirstWeek:
            return [1, 2, 3, 4, 5, 6, 7]
        case PartOfMonthEnum.SecondWeek:
            return [8, 9, 10, 11, 12, 13, 14]
        case PartOfMonthEnum.ThirdWeek:
            return [15, 16, 17, 18, 19, 20, 21]
        case PartOfMonthEnum.ForthWeek:
            return [22, 23, 24, 25, 26, 27, 28]
    }
}

export const getPartOfMonth = (constant) => {
    switch (constant) {
        case PartOfMonthEnum.FirstWeek:
            return 1
        case PartOfMonthEnum.SecondWeek:
            return 2
        case PartOfMonthEnum.ThirdWeek:
            return 3
        case PartOfMonthEnum.ForthWeek:
            return 4
    }
}


export const nextEventDateSwitch = (currentDate, dayOfMonth, extraMonth = 0) => {
    switch (dayOfMonth) {
        case "1-7":
            return newEventDate(currentDate, 1, extraMonth);
        case "8-14":
            return newEventDate(currentDate, 8, extraMonth);
        case "15-21":
            return newEventDate(currentDate, 15, extraMonth);
        case "22-28":
            return newEventDate(currentDate, 22, extraMonth);
    }
}

export const fromBackupDate = (backupDate, type) => {
    const data = new Date(backupDate);
    const date = data.getDate();
    const day = data.getDay();
    const month = data.getMonth();
    const year = data.getFullYear();
    const hours = data.getHours();
    const minutes = data.getMinutes();

    switch (type) {
        case "timelineTitle":
            return `${zeroBefore(date)} ${MonthsEnum.AlternateName[month]}, ${zeroBefore(hours)}:${zeroBefore(minutes)}`
        case "recovery":
            return `${zeroBefore(date)}${zeroBefore(month + 1)}${zeroBefore(year)}-${zeroBefore(hours)}:${zeroBefore(minutes)}`
        default:
            return {date, day, month, year, hours, minutes}
    }
}
