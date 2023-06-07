import React, {useState} from "react";
import {observer} from "mobx-react";
import MachinesTable from "../components/tables/MachinesTable";
import machineStore from "../stores/MachineStore";
import TopPageSearch from "../components/common/TopPageSearch";

const DevicesPage = observer(() => {
    const [machineName, setMachineName] = useState('')

    return <>
        <TopPageSearch value={machineName} onChange={setMachineName}/>
        <div className="divider-block"/>
        <MachinesTable dataSource={machineStore.findMachinesByName(machineName)}/>
    </>
});
export default DevicesPage;