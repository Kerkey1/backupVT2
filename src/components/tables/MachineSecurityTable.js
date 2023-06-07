import React from "react";
import {observer} from "mobx-react";
import {Table} from "antd";
import VirtualMachineIcon from "../icons/VirtualMachineIcon";
import {StatusEnum} from "../../constants/enums/StatusEnum";
import StatusIcon from "../icons/StatusIcon";
import planStore from "../../stores/PlansStore";
import backupStore from "../../stores/BackupStore";
import useColumns from "../../hooks/useColumns";

const MachineSecurityTable = observer(({dataSource, onRowClick}) => {
    const columns = useColumns([
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
            title: 'План',
            dataIndex: 'plan',
            key: 'plan',
            render: (_, record) => {
                const planExist = planStore.getPlanByMachineId(record.uuid)
                return planExist ? <StatusIcon status={StatusEnum.Success} text="Создан"/> :
                    <StatusIcon status={StatusEnum.Error} text="Отсутствует"/>
            }
        },
        {
            title: 'Количество копий',
            dataIndex: 'copiesCount',
            key: 'copiesCount',
            render: (_, record) => backupStore.getByMachineId(record.uuid)?.length ?? "Нет копий"
        },
        {
            title: 'Последний бэкап',
            dataIndex: 'lastBackup',
            key: "lastBackup",
            render: (_, record) => backupStore.getLastBackup(record.uuid)
        },
        {
            title: 'Следующий бэкап',
            dataIndex: 'nextBackup',
            key: "nextBackup",
            render: (_, record) => planStore.getNextBackup(record.uuid)
        },
    ], [backupStore, planStore])

    return <Table
        rowKey="uuid"
        columns={columns}
        dataSource={dataSource}
        rowClassName="cursor-pointer"
        onRow={(record) => {
            return {
                onClick: (event) => {
                    onRowClick(record.uuid)
                },
            }
        }}
    />
});
export default MachineSecurityTable