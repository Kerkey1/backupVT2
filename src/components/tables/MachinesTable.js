import React, {useState} from "react";
import {Button, Space, Table, Tooltip} from "antd";
import {
    PauseCircleOutlined,
    PlayCircleOutlined,
    RedoOutlined,
} from "@ant-design/icons";
import machineStore from "../../stores/MachineStore";
import {useEffect} from "react";
import {observer} from "mobx-react";
import VirtualMachineIcon from "../icons/VirtualMachineIcon";
import {MachineStatusEnum} from "../../constants/enums/MachineStatusEnum";
import StatusIcon from "../icons/StatusIcon";
import {StatusEnum} from "../../constants/enums/StatusEnum";

const MachinesTable = observer(({dataSource}) => {
    const [data, setData] = useState([])

    useEffect(() => {
        setData(dataSource.map(v => {
            return {...v, disabled: false}
        }))
    }, [dataSource])

    const disable = (id, status, state) => {
        const index = data.findIndex(source => source.uuid === id);
        let temp = data
        temp[index].disabled = status;
        setData([...temp]);
        if (state) machineStore.changeMachineStatus(id, state)
    }


    const handleStop = (id) => {
        disable(id, true)
        machineStore.stop(id).then(() => disable(id, false, MachineStatusEnum.Halted))
    }

    const handleStart = (id) => {
        disable(id, true)
        machineStore.start(id).then(() => disable(id, false, MachineStatusEnum.Running))
    }

    const handleReboot = (id) => {
        disable(id, true)
        machineStore.reboot(id).then(() => disable(id, false))
    }

    const columns = [
        {
            title: 'Тип',
            dataIndex: 'type',
            key: 'type',
            render: () => <VirtualMachineIcon/>
        },
        {
            title: 'Имя',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Статус',
            dataIndex: 'state',
            key: 'state',
            render: (state) => {
                switch (state) {
                    case MachineStatusEnum.Running :
                        return <StatusIcon status={StatusEnum.Success} text="Запущена"/>
                    case MachineStatusEnum.Halted :
                        return <StatusIcon status={StatusEnum.Error} text="Остановлена"/>
                }
            }
        },
        {
            title: '',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => {
                switch (record.state) {
                    case MachineStatusEnum.Running:
                        return <Space>
                            <Tooltip placement="top" title="Остановить">
                                <Button
                                    icon={<PauseCircleOutlined/>}
                                    disabled={record.disabled}
                                    onClick={() => handleStop(record.uuid)}/>
                            </Tooltip>
                            <Tooltip placement="top" title="Перезагрузить">
                                <Button
                                    icon={<RedoOutlined/>}
                                    disabled={record.disabled}
                                    onClick={() => handleReboot(record.uuid)}/>
                            </Tooltip>
                        </Space>
                    case MachineStatusEnum.Halted :
                        return <Tooltip placement="top" title="Запустить">
                            <Button
                                icon={<PlayCircleOutlined/>}
                                disabled={record.disabled}
                                onClick={() => handleStart(record.uuid)}/>
                        </Tooltip>
                }
            }
        }
    ]

    return <Table
        rowKey='uuid'
        dataSource={data}
        columns={columns}
    />
});
export default MachinesTable;