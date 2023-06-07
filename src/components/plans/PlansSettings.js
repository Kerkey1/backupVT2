import React from "react";
import {observer} from "mobx-react";
import {Space} from "antd";
import Radio from "antd/es/radio/radio";
import EverydayPlan from "./EverydayPlan";
import EveryWeekPlan from "./EveryWeekPlan";
import EveryMonthPlan from "./EveryMonthPlan";

const PlansSettings = observer(({
                                    plan,
                                    setPlan,
                                    radio,
                                    setRadio
                                }) => {

    const settingsByRadio = (radio, p, sP) => {
        switch (radio) {
            case "everyday":
                return <EverydayPlan key={p?.id} plan={p} setPlan={sP}/>
            case "everyWeek":
                return <EveryWeekPlan key={p?.id} plan={p} setPlan={sP}/>
            case "everyMonth":
                return <EveryMonthPlan key={p?.id} plan={p} setPlan={sP}/>
        }
    }

    return <div className="plans-main-wrapper">
        <div>
            <Radio.Group key={Math.random() * 100} onChange={(event) => setRadio(event.target.value)} value={radio}>
                <Space direction="vertical">
                    <Radio value={"everyday"}>Ежедневно</Radio>
                    <Radio value={"everyWeek"}>Еженедельно</Radio>
                    <Radio value={"everyMonth"}>Ежемесячно</Radio>
                </Space>
            </Radio.Group>
        </div>
        <div className="plans-settings-wrapper">
            {settingsByRadio(radio, plan, setPlan)}
        </div>

    </div>
});
export default PlansSettings