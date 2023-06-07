import React from "react";
import {observer} from "mobx-react";
import NotificationCardList from "../../../lists/NotificationCardList";
import notificationStore from "../../../../stores/NotificationStore";
import {useState} from "react";
import {Popover} from "antd";
import {BellOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router";

const NotificationPopover = observer(() => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)

    const onNavigate = () => {
        navigate("/notifications")
        setOpen(false)
    }

    return <Popover
        content={
            <div style={{width: "300px"}}>
                <NotificationCardList small notifications={notificationStore.sortByDate(5)}/>
                <span className="view-all" onClick={onNavigate}>Посмотреть все</span>
            </div>
        }
        trigger="click"
        placement="bottomRight"
        open={open}
        onOpenChange={(open) => setOpen(open)}
    >
        <BellOutlined/>
    </Popover>
});
export default NotificationPopover;