import React from "react";
import {observer} from "mobx-react";
import {Select} from "antd";
import machineStore from "../../stores/MachineStore";


const MachineSelect = observer(({value, onChange, single}) => {
    return <Select
        className="calendar-action"
        placeholder="Выберите машины"
        allowClear
        mode={single ? undefined : "multiple"}
        value={value}
        onChange={onChange}
        style={{minWidth: "200px"}}
        maxTagCount={3}
        options={machineStore.data?.map(machine => {
            return {label: machine.name, value: machine.uuid}
        })}
    />

});
export default MachineSelect;