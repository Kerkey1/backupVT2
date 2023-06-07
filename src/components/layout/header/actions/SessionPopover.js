import React, {useEffect, useState} from "react";
import {UserOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router";
import {Button, Popover} from "antd";

const SessionPopover = () => {
    const navigate = useNavigate();
    const [openUser, setOpenUser] = useState(false);
    const [user, setUser] = useState();

    useEffect(() => {
        const session = JSON.parse(sessionStorage.getItem('currentSession'));
        if (session)
            setUser(session)
    }, [])

    const onClick = () => {
        sessionStorage.clear();
        navigate('/login')
    }

    const content = <div className="user-popover-wrapper">
        <p><b>Хост:</b> {user?.host}</p>
        <p><b>Логин:</b> {user?.login}</p>
        <Button type="primary" htmlType="submit" onClick={onClick} style={{width: "100%", fontSize: "16px", height: "35px"}}>
            Отключиться
        </Button>
    </div>

    return <Popover
        content={content}
        trigger="click"
        placement="bottomRight"
        open={openUser}
        onOpenChange={(open) => setOpenUser(open)}
    >
        <UserOutlined className="wrapper-header-image"/>
    </Popover>
}
export default SessionPopover