import {StatusEnum} from "../../constants/enums/StatusEnum";
import {notification} from "antd";

export const notifications = (status, message, description, placement = "bottomRight") => {
    notification.config({
        placement,
        duration: 5,
        maxCount: 3,
    })

    switch (status) {
        case StatusEnum.Success:
            return notification.success({
                message: 'Успешно',
                description,
            });
        case StatusEnum.Warning:
            return notification.warning({
                message: 'Ошибка',
                description,
            });
        case StatusEnum.Error:
            return notification.error({
                message: `Ошибка - ${message}`,
                description,
            });
    }
}