import React from "react";
import {observer} from "mobx-react";
import {Button, InputNumber, Space, TimePicker} from "antd";
import dayjs from "dayjs";
import {CloseOutlined} from "@ant-design/icons";

const format = 'HH:mm';

const EverydayPlan = observer(({plan, setPlan}) => {
    const onCopiesChange = (copies) => setPlan(prev => ({...prev, copies: copies}));
    const onTimeChange = (time, key) => {
        let temp = plan;
        temp.minute[key] = time.$m;
        temp.hour[key] = time.$H;
        setPlan(prev => ({...prev, hour: temp.hour, minute: temp.minute}));
    }

    const addNewTime = () => {
        let temp = plan;
        temp.minute.push(0);
        temp.hour.push(0);
        setPlan(prev => ({...prev, hour: temp.hour, minute: temp.minute}));
    }

    const deleteTime = (index) => {
        let temp = {...plan};
        temp.minute.splice(index, 1);
        temp.hour.splice(index, 1);
        setPlan(() => ({...temp}))
    }

    const generatePlanTimes = (plan) => {
        let res = [];
        for (let i = 0; i < plan.hour.length; i++) {
            res.push(<Space key={i}>
                <TimePicker
                    style={{width: "150px", marginTop: "7px"}}
                    onChange={(time) => onTimeChange(time, i)}
                    key={i + plan.hour[i] + plan.minute[i]}
                    defaultValue={dayjs((plan.hour[i] + ":" + plan.minute[i]), format)}
                    format={format}
                    allowClear={false}
                />
                {plan.hour.length > 1 && <CloseOutlined onClick={() => deleteTime(i)}/>}
            </Space>)
        }
        return res
    }

    return <>
        {plan &&
        <>
            <div className="smw-row-wrapper">
                <div className="smw-col-wrapper-end">Количество копий:</div>
                <div className="smw-col-wrapper-start">
                    <InputNumber
                        min={1}
                        max={30}
                        defaultValue={plan.copies}
                        onChange={onCopiesChange}
                        style={{width: "150px"}}
                    />
                </div>
            </div>
            <div className="smw-row-wrapper">
                <div className="smw-col-wrapper-end">
                    Время выполнения:
                </div>
                <div className="smw-col-wrapper-start">
                    <div className="smw-col-wrapper-start-column">
                        {generatePlanTimes(plan)}
                        <Button style={{width: "150px", marginTop: "7px"}} onClick={() => addNewTime()} type="primary">
                            Добавить время
                        </Button>
                    </div>
                </div>
            </div>
        </>
        }
    </>
});
export default EverydayPlan;