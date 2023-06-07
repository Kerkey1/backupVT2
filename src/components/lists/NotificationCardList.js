import React from "react";
import NotificationCard from "../cards/NotificationCard";
import {observer} from "mobx-react";

const NotificationCardList = observer(({notifications, small}) => notifications.map(notification => <NotificationCard
    small={small}
    key={notification.id}
    notification={notification}/>))
export default NotificationCardList