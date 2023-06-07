import React from "react";
import {observer} from "mobx-react";
import {Tooltip} from "antd";
import planStore from "../../stores/PlansStore";
import {DeleteOutlined} from "@ant-design/icons";
import machineStore from "../../stores/MachineStore";

const MachineList = observer(({curMachine, setMachine}) => {

    const deletePlan = (id) => {
        const session = JSON.parse(sessionStorage.getItem('currentSession'));
        if (session)
            planStore.deletePlan(id)
    }

    return <ul className="plan-machine-list">
        {machineStore.data.map(machine =>
            <li
                key={machine.uuid}
                onClick={() => {
                    setMachine(machine.uuid)
                }}
                className={machine?.uuid === curMachine ? "active" : ""}
            >
                {machine.name}
                {planStore.data.find(plan => plan.machines === machine.uuid) &&
                <Tooltip title={"Удалить план для " + machine.name}>
                    <DeleteOutlined
                        style={{color: "red", padding: "5px"}}
                        onClick={() => deletePlan(planStore.data.find(plan => plan.machines === machine.uuid).id)}
                    />
                </Tooltip>
                }
            </li>
        )}
    </ul>
});
export default MachineList