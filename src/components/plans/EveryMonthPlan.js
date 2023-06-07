import React from "react";
import {observer} from "mobx-react";
import EveryWeekPlan from "./EveryWeekPlan";
import PartOfMonthSelect from "../selects/PartOfMonthSelect";

const EveryMonthPlan = observer(({plan, setPlan}) => {
    const onWeekChanged = (dayOfMonth) => setPlan(prev => ({...prev, dayOfMonth: dayOfMonth}));
    return <>
        {plan && <>
            <EveryWeekPlan plan={plan} setPlan={setPlan}/>
            <div className="smw-row-wrapper">
                <div className="smw-col-wrapper-end">Неделя месяца:</div>
                <div className="smw-col-wrapper-start">
                    <PartOfMonthSelect value={plan.dayOfMonth} onChange={onWeekChanged}/>
                </div>
            </div>
        </>
        }
    </>
});
export default EveryMonthPlan;