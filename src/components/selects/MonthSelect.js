import React from "react";
import {observer} from "mobx-react";
import {Select} from "antd";
import {MonthsEnum} from "../../constants/enums/MonthsEnum";

const MonthSelect = observer(({value, onChange}) => {

    return <Select
        value={value}
        options={MonthsEnum.StraightName.map(month => {
            return {label: month, value: MonthsEnum.StraightName.indexOf(month)}
        })}
        onChange={onChange}
        style={{width: "120px"}}
    />
});
export default MonthSelect;