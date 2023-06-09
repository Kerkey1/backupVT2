import React, {useEffect, useState} from "react";
import {observer} from "mobx-react";
import Modal from "antd/es/modal/Modal";
import planStore from "../../stores/PlansStore";
import machineStore from "../../stores/MachineStore";
import PlansSettings from "./PlansSettings";
import MachineList from "../lists/MachineList";

const PlansSettingsModal = observer(({open, setOpen, machineId}) => {
    const [machine, setMachine] = useState();
    const [plan, setPlan] = useState();
    const [radio, setRadio] = useState();

    useEffect(() => {
        if (machineId)
            setMachine(machineId)
    }, [machineId])

    useEffect(() => {
        const p = planStore.data.find(plan => plan.machines === machine);
        if (p) setPlan(p)
        else {
            setRadio("everyday")
            setPlan({
                machines: machine,
                dayOfWeek: undefined,
                dayOfMonth: undefined,
                minute: [0],
                hour: [0],
                copies: 1,
            })
        }

        if (!p) setRadio("everyday");
        else {
            if (p?.dayOfMonth) setRadio("everyMonth");
            else if (p?.dayOfWeek) setRadio("everyWeek");
            else setRadio("everyday");
        }
    }, [machine])


    const onCancel = () => setOpen(!open)
    const savePlan = () => {
        let data = plan;
        switch (radio) {
            case "everyday":
                data.dayOfMonth = undefined;
                data.dayOfWeek = undefined;
                break;
            case "everyWeek":
                data.dayOfMonth = undefined;
                break;
            case "everyMonth":
                break;
        }

        data.id ? planStore.updatePlan(data) : planStore.createPlan(data);
        onCancel()
    }

    return <Modal
        title={machineId ? `Настройка плана для ${machineStore.getById(machineId)?.name}` : "Настройка планов"}
        open={open}
        onCancel={onCancel}
        cancelText="Отмена"
        onOk={savePlan}
        width={machineId ? 600 : 1000}
    >
        <div className="plans-main-wrapper-modal">
            {!machineId && <MachineList curMachine={machine} setMachine={setMachine}/>}
            {machine && <PlansSettings key={plan?.id} plan={plan} setPlan={setPlan} radio={radio} setRadio={setRadio}/>}
        </div>
    </Modal>
});
export default PlansSettingsModal;