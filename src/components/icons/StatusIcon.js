import React from "react";
import {CheckCircleOutlined, CloseCircleOutlined, WarningOutlined} from "@ant-design/icons";
import {StatusEnum} from "../../constants/enums/StatusEnum";
import {Space} from "antd";

const StatusIcon = ({status, text}) => {
    switch (status) {
        case StatusEnum.Success:
            return <Space className="success-color status">
                <CheckCircleOutlined/>
                <span>{text ?? "Успешно"}</span>
            </Space>
        case StatusEnum.Warning:
            return <Space className="warning-color status">
                <WarningOutlined/>
                <span>{text ?? "Внимание"}</span>
            </Space>
        case StatusEnum.Error:
            return <Space className="error-color status">
                <CloseCircleOutlined/>
                <span>{text ?? "Ошибка"}</span>
            </Space>
    }
};
export default StatusIcon;