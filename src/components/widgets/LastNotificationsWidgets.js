import React from "react";
import {observer} from "mobx-react";
import notificationStore from "../../stores/NotificationStore";
import NotificationCardList from "../lists/NotificationCardList";
import {useNavigate} from "react-router";
import {Button} from "antd";

const LastNotificationsWidget = observer(() => {
    const navigate = useNavigate();
    const handleNavigate = () => navigate("/notifications")
    return <div style={{overflowY: "auto"}}>
        <NotificationCardList small notifications={notificationStore.sortByDate(5)}/>
        <Button style={{width: "100%", borderRadius: 0}} type="primary" onClick={handleNavigate}>Посмотреть все</Button>
    </div>
})
export default LastNotificationsWidget;