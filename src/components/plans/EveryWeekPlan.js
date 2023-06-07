import React from "react";
import {observer} from "mobx-react";
import EverydayPlan from "./EverydayPlan";
import DayOfWeekSelect from "../selects/DayOfWeekSelect";

const EveryWeekPlan = observer(({plan, setPlan}) => {
    const changeDayOfWeek = (day) => setPlan(prev => ({...prev, dayOfWeek: day}));
    return <>
        {plan && <>
            <EverydayPlan plan={plan} setPlan={setPlan}/>
            <div className="smw-row-wrapper">
                <div className="smw-col-wrapper-end">День недели:</div>
                <div className="smw-col-wrapper-start">
                    <DayOfWeekSelect value={plan.dayOfWeek} onChange={changeDayOfWeek}/>
                </div>
            </div>
        </>
        }
    </>
});
export default EveryWeekPlan;