import React from "react";
import {observer} from "mobx-react";
import Calendar from "../components/plans/Calendar";
import planStore from "../stores/PlansStore";
import machineStore from "../stores/MachineStore";

const PlansPage = observer(() => {

    return <>
        <Calendar
            plansOnDays={planStore.data}
            machines={machineStore.data}/>
    </>

});
export default PlansPage;