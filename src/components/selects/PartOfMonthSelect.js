import React from "react";
import {observer} from "mobx-react";
import {Select} from "antd";
import {PartOfMonthEnum} from "../../constants/enums/PartOfMonthEnum";

const PartOfMonthSelect = observer(({value, onChange}) => {
    const options = [
        {
            value: PartOfMonthEnum.FirstWeek,
            label: "Первая",
        },
        {
            value: PartOfMonthEnum.SecondWeek,
            label: "Вторая",
        },
        {
            value: PartOfMonthEnum.ThirdWeek,
            label: "Третья",
        },
        {
            value: PartOfMonthEnum.ForthWeek,
            label: "Четвертая",
        }
    ]
    return <Select
        style={{width: "150px"}}
        value={value}
        onChange={onChange}
        options={options}
    />
});
export default PartOfMonthSelect;