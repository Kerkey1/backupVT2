import React, {useEffect, useState} from "react";
import TwoCircleTemplate from "./templates/TwoCircleTemplate";
import {observer} from "mobx-react";
import {autorun} from "mobx";
import machineStore from "../../stores/MachineStore";
import planStore from "../../stores/PlansStore";
import {MachineStatusEnum} from "../../constants/enums/MachineStatusEnum";
import {MachineStatusTranslationEnum} from "../../constants/enumTranslations/MachineStatusTranslationEnum";
import {ColorEnum} from "../../constants/enums/ColorEnum";

const PlanExistCircle = observer(({}) => {
    const [data, setData] = useState([])
    const [totalData, setTotalData] = useState([])
    const [legendPayloads, setLegendPayloads] = useState([])
    useEffect(() => {
        const disposer = autorun(() => {
            const total = machineStore.data.map(machine => {
                const plan = planStore.getPlanByMachineId(machine.uuid);
                return {
                    status: !!plan,
                    text: machine.state === MachineStatusEnum.Running ? MachineStatusTranslationEnum[MachineStatusEnum.Running] : MachineStatusTranslationEnum[MachineStatusEnum.Halted]
                }
            })

            const positive = total.filter((device) => device.status === true).length;
            const negative = total.length - positive;

            setTotalData([{name: 'Всего устройств', value: total.length, color: ColorEnum.ActiveMainColor}])
            setData([
                {name: "Есть план", value: positive, color: ColorEnum.Green},
                {name: 'Без плана', value: negative, color: ColorEnum.Red},
            ])

            setLegendPayloads(
                [
                    {value: `Есть план - ${positive}`, type: 'circle', color: ColorEnum.Green, id: 'legend-1'},
                    {value: `Без плана - ${negative}`, type: 'circle', color: ColorEnum.Red, id: 'legend-2'},
                    {
                        value: `Всего устройств - ${total.length}`,
                        type: 'circle',
                        color: ColorEnum.ActiveMainColor,
                        id: 'legend-2'
                    },
                ]
            )
        })
        return () => disposer()
    }, [])


    return <TwoCircleTemplate
        data={data}
        totalData={totalData}
        legendPayloads={legendPayloads}
        tooltipFormatter={(value) => `${value}`}/>
});
export default PlanExistCircle;