import React from "react";
import {observer} from "mobx-react";
import {Select} from "antd";

const YearSelect = observer(({value, onChange, listOfYears}) => {

    return <Select
        className="calendar-action"
        value={value}
        options={listOfYears.map(year => {
            return {label: year, value: year}
        })}
        onChange={onChange}
        style={{width: "120px"}}
    />
});
export default YearSelect;