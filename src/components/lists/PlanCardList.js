import React from "react";
import PlanCard from "../cards/PlanCard";
import {observer} from "mobx-react";

const PlanCardList = observer(({plans, styles}) => {
    return <>
        {plans.map(plan => <PlanCard key={plan.id} styles={styles} plan={plan}/>)}
    </>


});
export default PlanCardList;