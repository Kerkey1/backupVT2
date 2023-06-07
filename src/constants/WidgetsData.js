import React from "react";
import {WidgetSizeEnum} from "./enums/WidgetSizeEnum";
import LastNotificationsWidget from "../components/widgets/LastNotificationsWidgets";
import PlansTodayWidget from "../components/widgets/PlansTodayWidget";
import PlanExistCircle from "../components/widgets/PlanExistCircle";

export const WidgetsData = [
    {
        title: "Последние уведомления",
        key: "lastNotifications",
        hint: "Последние пришедшие уведомления",
        size: WidgetSizeEnum.HalfWidth,
        styles: {overflowY: "auto"},
        content: <LastNotificationsWidget/>
    },
    {
        title: "Планы на сегодня",
        key: "plansToday",
        hint: "Показывает события, запланированные на сегодня",
        styles: {overflowY: "auto"},
        size: WidgetSizeEnum.HalfWidth,
        content: <PlansTodayWidget/>
    },
    {
        title: "Устройства под защитой",
        key: "noBackups",
        hint: "Показывает для скольки устройств настроен план",
        size: WidgetSizeEnum.HalfWidth,
        content: <PlanExistCircle/>
    }
]