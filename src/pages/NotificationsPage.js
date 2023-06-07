import React, {useState} from "react";
import {observer} from "mobx-react";
import NotificationsTable from "../components/tables/NotificationsTable";
import notificationStore from "../stores/NotificationStore";
import TopPageSearch from "../components/common/TopPageSearch";
import StatusSelect from "../components/selects/StatusSelect";

const NotificationsPage = observer(({}) => {
    const [machineName, setMachineName] = useState('')
    const [notificationStatus, setNotificationStatus] = useState(undefined)

    const filters = [
        {
            key: "status",
            title: "Тип уведомления",
            content: <StatusSelect key="status" value={notificationStatus} onChange={setNotificationStatus}/>
        }
    ]

    return <>
        <TopPageSearch value={machineName} onChange={setMachineName} filters={filters}/>
        <div className="divider-block"/>
        <NotificationsTable dataSource={notificationStore.sortFilterSearch(machineName, notificationStatus)}/>
    </>
});
export default NotificationsPage;