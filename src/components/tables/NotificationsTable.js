import React from "react";
import {observer} from "mobx-react";
import machineStore from "../../stores/MachineStore";
import {StatusEnum} from "../../constants/enums/StatusEnum";
import notificationStore from "../../stores/NotificationStore";
import {Table, Tooltip} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import StatusIcon from "../icons/StatusIcon";
import {fromBackupDate} from "../../utils";
import useColumns from "../../hooks/useColumns";

const NotificationsTable = observer(({dataSource}) => {
    const columns = useColumns([
        {
            title: 'Машина',
            dataIndex: 'machine',
            key: 'machine',
            render: (_, record) => {
                const machine = machineStore.getById(record.machine);
                return machine?.name
            }
        },
        {
            title: 'Дата',
            dataIndex: 'data',
            key: 'data',
            render: (data) => fromBackupDate(data, "timelineTitle")
        },
        {
            title: 'Тип',
            dataIndex: 'typeMessage',
            key: 'typeMessage',
            render: (type) => <StatusIcon status={type === StatusEnum.Success ? StatusEnum.Success : StatusEnum.Error}/>
        },
        {
            title: 'Сообщение',
            dataIndex: 'message',
            key: 'message',
        },
        {
            title: '',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => {
                return <>
                    <Tooltip placement="left" title="Удалить уведомление">
                        <DeleteOutlined
                            style={{color: "red", padding: "5px"}}
                            onClick={() => notificationStore.deleteNotifications(record.id)}
                        />
                    </Tooltip>
                </>
            }
        }
    ], [machineStore, notificationStore])

    return <Table
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
    />
});
export default NotificationsTable