import React, {useEffect, useState} from "react";
import planStore from "../../stores/PlansStore";
import {getArrayForPartOfMonthEnum} from "../../utils";
import {observer} from "mobx-react";
import {autorun} from "mobx";
import PlanCardList from "../lists/PlanCardList";

const PlansTodayWidget = observer(() => {
    const [dataSource, setDataSource] = useState([])

    useEffect(() => {
        const disposer = autorun(() => {
            setDataSource(planStore.data.filter(plan => {
                const today = new Date();
                if (plan.dayOfMonth !== undefined) {
                    const arrayOfDates = getArrayForPartOfMonthEnum(plan.dayOfMonth);
                    return arrayOfDates.includes(today.date) && plan.dayOfWeek === today.getDay();
                } else if (plan.dayOfWeek !== undefined) {
                    return today.getDay() === plan.dayOfWeek;
                } else {
                    return true
                }
            }))
        })
        return () => disposer()
    }, [])

    return <PlanCardList plans={dataSource} styles="flat"/>
})
export default PlansTodayWidget;