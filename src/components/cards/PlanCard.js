import React from "react";
import Description from "../common/Description";
import machineStore from "../../stores/MachineStore";
import {DaysOfWeekEnum} from "../../constants/enums/DaysOfWeekEnum";
import {getPartOfMonth, zeroBefore} from "../../utils";
import {observer} from "mobx-react";

const PlanCard = observer(({plan, styles}) => {
    const generateTimes = (hours, minutes) => {
        if (hours.length === 1)
            return <Description label="Время" description={`${zeroBefore(hours[0])}:${zeroBefore(minutes[0])}`}/>
        const results = []
        for (let i = 0; i < hours.length; i++) {
            results.push(
                <Description
                    key={plan.id + hours[i] + minutes[i]}
                    label={`Время ${i}`}
                    description={`${zeroBefore(hours[i])}:${zeroBefore(minutes[i])}`}/>
            )
        }
        return results
    }

    const generatePeriodicity = (dayOfWeek, dayOfMonth) => {
        if (dayOfMonth !== undefined) {
            return <>
                <Description label="Периодичность" description="Ежемесячно"/>
                <Description label="Неделя месяца" description={getPartOfMonth(dayOfMonth)}/>
                <Description label="День недели" description={DaysOfWeekEnum.FullNames[dayOfWeek]}/>
            </>
        } else if (dayOfWeek !== undefined) {
            return <>
                <Description label="Периодичность" description="Еженедельно"/>
                <Description label="День недели" description={DaysOfWeekEnum.FullNames[dayOfWeek]}/>
            </>
        } else {
            return <Description label="Периодичность" description="Ежедневно"/>
        }
    }

    return plan && <div className={`plan-card ${styles}`}>
        <Description label="Устройство" description={machineStore.getById(plan?.machines)?.name}/>
        <Description label="Максимальное количество копий для хранения" description={plan?.copies}/>
        {generatePeriodicity(plan.dayOfWeek, plan.dayOfMonth)}
        {generateTimes(plan.hour, plan.minute)}
    </div>


});
export default PlanCard