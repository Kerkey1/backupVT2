import React, {useEffect, useState} from "react";
import {DaysOfWeekEnum} from "../../constants/enums/DaysOfWeekEnum";
import MachineSelect from "../selects/MachineSelect";
import YearSelect from "../selects/YearSelect";
import MonthSelect from "../selects/MonthSelect";
import {getArrayForPartOfMonthEnum} from "../../utils";
import {observer} from "mobx-react";
import DrawerTemplate from "../common/drawer/DrawerTemplate";
import PlanCardList from "../lists/PlanCardList";
import {MonthsEnum} from "../../constants/enums/MonthsEnum";
import DrawerSubHeader from "../common/drawer/DrawerSubHeader";
import PlansSettingsModal from "./PlansSettingsModal";
import {PlusSquareOutlined, SettingOutlined} from "@ant-design/icons";

const Calendar = observer(({plansOnDays, machines}) => {
    const [currDate, setCurrDate] = useState({
        dayOfWeek: undefined,
        date: undefined,
        month: undefined,
        year: undefined,
    });

    const [date] = useState(new Date());
    const [listOfYears, setListOfYears] = useState([]);
    const [lastActiveDay, setLastActiveDay] = useState();
    const [visibleMachines, setVisibleMachines] = useState([]);
    const [dayInfoDrawerVisible, setDayInfoDrawerVisible] = useState(false);
    const [planModalOpen, setPlanModalOpen] = useState(false)

    // инициализация календаря
    useEffect(() => {
        const year = date.getFullYear();
        identDate()
        setListOfYears(numberRange(year - 2, year + 5))
    }, [])
    const identDate = () => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const dayOfWeek = date.getDay();
        const day = date.getDate();
        setCurrDate(customObjectDateCreate(dayOfWeek, day, month, year))
    }
    // обновление календаря
    useEffect(() => {
        if (currDate.month !== undefined && currDate.year !== undefined && machines && plansOnDays) {
            const node = document.getElementById('table-body');
            node.innerHTML = '';
            lastActiveDay ? renderCalendar(currDate.month, currDate.year, JSON.parse(lastActiveDay?.getAttribute("data-value"))) : renderCalendar(currDate.month, currDate.year)
        }
    }, [currDate, plansOnDays, machines, visibleMachines])

    // useEffect(() => {
    //     if (passedMachine)
    //         setVisibleMachines(passedMachine)
    // }, [passedMachine])

    const numberRange = (start, end) => new Array(end - start).fill().map((d, i) => i + start);
    const itIsCurDay = (year, month, dateI) => date.getFullYear() === year && date.getMonth() === month && date.getDate() === dateI;
    const updateMonth = (month) => setCurrDate(prev => ({...prev, month: month}))
    const updateYear = (year) => setCurrDate(prev => ({...prev, year: year}))
    // const updateDay = (day) => setCurrDate(prev => ({...prev, dayOfWeek: day}))
    // const updateDate = (date) => setCurrDate(prev => ({...prev, date: date}))
    const customObjectDateCreate = (day, date, month, year) => {
        return {
            dayOfWeek: day,
            date: date,
            month: month,
            year: year,
        }
    }

    // выборка планов на день
    const planAtThisDay = (dayOfCalendar, plans, useFilter) => plans.filter(plan => machinesAtThisDay(dayOfCalendar, plan, useFilter))
    const machinesAtThisDay = (calendarDay, plan, useFilter) => {
        if (plan && visibleMachines.includes(plan.machines) || plan && !useFilter)
            if (plan.dayOfMonth !== undefined) {
                const arrayOfDates = getArrayForPartOfMonthEnum(plan.dayOfMonth);
                return arrayOfDates.includes(calendarDay.date) && plan.dayOfWeek === calendarDay.dayOfWeek;
            } else if (plan.dayOfWeek !== undefined) {
                return calendarDay.dayOfWeek === plan.dayOfWeek;
            } else {
                return true
            }
        else
            return false
    }

    // генерация календаря
    const renderCalendar = (month, year, lastActive) => {
        let array = collectDays(month, year);
        let tB = document.getElementById('table-body');
        let tr = document.createElement('tr');
        let i = 0;
        for (i; i < array.length; i++) {
            // новая строка
            if (array[i].dayOfWeek === 1)
                tr = document.createElement('tr');
            // добавление ячейки в строку
            tr.appendChild(createCell(array[i], lastActive))
            // конец строки
            if (array[i].dayOfWeek === 0)
                tB.appendChild(tr);
        }
    }

    const createCell = (item, lastActive) => {
        // создание ячейки
        let cell = document.createElement('td');
        cell.dataset.value = JSON.stringify(item);
        if (lastActive && lastActive.date === item.date && lastActive.month === item.month && lastActive.year === item.year && lastActive.dayOfWeek === item.dayOfWeek) {
            cell.classList.add("calendar-active-day");
            setLastActiveDay(cell)
        } else
            cell.className = currDate.month !== item.month ? "calendar-day calendar-day-of-other-months" : "calendar-day";

        // заголовок ячейки
        let cellHeader = document.createElement('div');
        itIsCurDay(item.year, item.month, item.date) ? cellHeader.className = "cur-cell-header" : cellHeader.className = "cell-header";
        let cellDate = document.createTextNode(item.date);
        cellHeader.appendChild(cellDate);

        // тело ячейки
        let cellBody = document.createElement('div')
        cellBody.className = "cell-body";
        const thisDayPlan = planAtThisDay(item, plansOnDays, true);
        if (thisDayPlan.length > 0)
            for (let plan of thisDayPlan) {
                let tempText = document.createTextNode(machines.find(machine => machine.uuid === plan.machines)?.name);
                let tempP = document.createElement('p');
                tempP.appendChild(tempText);
                cellBody.appendChild(tempP);
            }

        // сборка ячейки
        cell.appendChild(cellHeader);
        cell.appendChild(cellBody);
        return cell
    }

    const collectDays = (month, year) => {
        const lastDateOfMonth = new Date(year, month + 1, 0).getDate(), // последнее число месяца
            lastDayOfMonth = new Date(year, month, lastDateOfMonth).getDay(), // последний день месяца
            firstDayOfMonth = new Date(year, month, 1).getDay(), // первый день месяца
            lastDateOfLastMonth = new Date(year, month, 0).getDate(); // последнее число предыдущего месяца

        const resMonth = []

        // прошлый месяц
        if (firstDayOfMonth !== 1) {
            let tempFirstDay = firstDayOfMonth - 1;
            if (firstDayOfMonth === 0)
                tempFirstDay = 6
            let i = tempFirstDay;
            let lastMonth = lastDateOfLastMonth;
            for (i; i > 0; i--) {
                resMonth.push(customObjectDateCreate(i === 7 ? 0 : i, lastMonth, currDate.month === 0 ? 11 : currDate.month - 1, currDate.month === 0 ? currDate.year - 1 : currDate.year))
                lastMonth--;
            }
            resMonth.reverse();
        }

        // текущий месяц
        let i = 1;
        let tempFirstDay = firstDayOfMonth;
        for (i; i <= lastDateOfMonth; i++) {
            resMonth.push(customObjectDateCreate(tempFirstDay, i, currDate.month, currDate.year))
            tempFirstDay === 6 ? tempFirstDay = 0 : tempFirstDay++;
        }

        // следующий месяц
        if (lastDayOfMonth !== 0) {
            let i = lastDayOfMonth === 6 ? 0 : lastDayOfMonth + 1;
            let dateOfFutureMonth = 1;
            for (i; i <= 7; i++) {
                resMonth.push(customObjectDateCreate(i === 7 ? 0 : i, dateOfFutureMonth, currDate.month === 11 ? 0 : currDate.month + 1, currDate.month === 11 ? currDate.year + 1 : currDate.year))
                dateOfFutureMonth++;
            }
        }
        return resMonth
    }

    // переключение по нажатии на другой месяц в календаре
    const setDateOnClick = (event) => {
        const targetParent = event.target.parentNode;
        if (targetParent.nodeName === 'TD') {
            let cellData = JSON.parse(targetParent.getAttribute("data-value"))
            if (targetParent !== lastActiveDay) {
                targetParent.classList.add("calendar-active-day");
                targetParent.classList.remove("calendar-day");
                if (lastActiveDay) {
                    lastActiveDay?.classList.remove("calendar-active-day");
                    lastActiveDay?.classList.add("calendar-day");
                }
                setLastActiveDay(targetParent);
                setDayInfoDrawerVisible(true);
                setCurrDate(customObjectDateCreate(cellData.dayOfWeek, cellData.date, cellData.month, cellData.year));
            }
        }
    }

    const onCancel = () => {
        setDayInfoDrawerVisible(false)
        setLastActiveDay(undefined);
        identDate()
    }
    return <div>
        <div className="calendar-actions">
            <div>
                <MonthSelect value={currDate.month} onChange={updateMonth}/>
                <YearSelect value={currDate.year} onChange={updateYear} listOfYears={listOfYears}/>
                <MachineSelect value={visibleMachines} onChange={setVisibleMachines}/>
            </div>
            <span className="calendar-action-new" onClick={() => setPlanModalOpen(true)}>
                 <SettingOutlined />
                <span className="calendar-action-new-text">Настроить план</span>
            </span>
        </div>
        <div className="calendar-wrapper">
            <div className="divider-block-15"/>
            <table className="calendar-days-of-week-table">
                <thead>
                <tr className="th-days-of-week">
                    {DaysOfWeekEnum.ShortNames.map(day => <th key={day}>{day}</th>)}
                </tr>
                </thead>
                <tbody onClick={setDateOnClick} id="table-body"/>
            </table>
        </div>
        <DrawerTemplate
            title={currDate.date + " " + MonthsEnum.AlternateName[currDate.month]?.toLowerCase() + " " + currDate.year + " года - " + DaysOfWeekEnum.FullNames[currDate.dayOfWeek]?.toLowerCase()}
            content={
                <>
                    <DrawerSubHeader
                        text={`Количество машин для которых запланировано резеравное копирование: ${planAtThisDay(currDate, plansOnDays, false)?.length}`}/>
                    <PlanCardList plans={planAtThisDay(currDate, plansOnDays, false)}/>
                </>
            }
            visible={dayInfoDrawerVisible}
            onClose={onCancel}
        />
        <PlansSettingsModal open={planModalOpen} setOpen={setPlanModalOpen} mode={""}/>
    </div>
});
export default Calendar