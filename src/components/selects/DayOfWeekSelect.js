import React from "react";
import {observer} from "mobx-react";
import {Select} from "antd";
import {DaysOfWeekEnum} from "../../constants/enums/DaysOfWeekEnum";

const DayOfWeekSelect = observer(({value, onChange}) => {

    return <Select
        style={{width: "150px"}}
        value={value}
        onChange={onChange}
        options={DaysOfWeekEnum.FullNames.map(day => {
            return {label: day, value: DaysOfWeekEnum.FullNames.indexOf(day)}
        })}
    />
})
export default DayOfWeekSelect;