import React from "react";
import StatusIcon from "../icons/StatusIcon";
import notificationStore from "../../stores/NotificationStore";
import {DeleteOutlined} from "@ant-design/icons";
import {Tooltip} from "antd";
import {fromBackupDate} from "../../utils";
import machineStore from "../../stores/MachineStore";
import {observer} from "mobx-react";

const NotificationCard = observer(({notification, small}) => {
    return <div className="notification-card">
        {!small ? <>
                <div className="notification-card-header">
            <span className="align-items-center">
                <StatusIcon status={notification?.typeMessage}/>
                <span className="notification-card-date">{fromBackupDate(notification.data, "timelineTitle")}</span>
            </span>

                    <Tooltip placement="left" title="Удалить уведомление">
                        <DeleteOutlined
                            style={{color: "red", marginRight: "15px"}}
                            onClick={() => notificationStore.deleteNotifications(notification.id)}
                        />
                    </Tooltip>
                </div>
                <div className="notification-card-content">
                    <p>
                        {notification.message}
                    </p>
                </div>
            </> :
            <>
                <div className="notification-card-header">
                    <StatusIcon status={notification?.typeMessage}/>
                    <span className="notification-card-date">{machineStore.getById(notification.machine)?.name}</span>
                </div>
                <div className="notification-card-content-small">
                    <p>
                        {notification.message}
                    </p>
                    <span>{fromBackupDate(notification.data, "timelineTitle")}</span>
                </div>

            </>}
    </div>
});
export default NotificationCard