import React from "react";
import {DashboardOutlined, DesktopOutlined, SafetyOutlined, SettingOutlined} from "@ant-design/icons";
import DevicesPage from "../pages/DevicesPage";
import NotificationsPage from "../pages/NotificationsPage";
import ProtectedDevicesPage from "../pages/ProtectedDevicesPage";
import PlansPage from "../pages/PlansPage";
import WidgetsPage from "../pages/WidgetsPage";
import DashboardPage from "../pages/DashboardPage";
import SettingsPage from "../pages/SettingsPage";

export const PagesData = [
    {
        title: "Обзор", key: "overview", icon: <DashboardOutlined/>, routes: [
            {
                title: "Панель монитора",
                path: "/",
                hint: "На этой страницы отображаются закрепленные виджеты",
                element: <DashboardPage/>
            },
            {
                title: "Оповещения",
                path: "/notifications",
                hint: "На этой странице отображаются оповещения о событиях с устройствами",
                element: <NotificationsPage/>
            },
        ]
    },
    {
        title: "Устройства", key: "devices", icon: <DesktopOutlined/>, routes: [
            {
                title: "Виртуальные машины",
                path: "/devices",
                hint: "На этой странице отображаются устройства с возможностью их выключить, включить, перезагрузить",
                element: <DevicesPage/>
            },
        ]
    },
    {
        title: "Безопасность", key: "security", icon: <SafetyOutlined/>, routes: [
            {
                title: "Устройства",
                path: "/protectedDevices",
                hint: "На этой странице отобаражаются машинами с их планами и резервными копиями",
                element: <ProtectedDevicesPage/>
            },
            {
                title: "Планы",
                path: "/plans",
                hint: "Эта страница предназначена для просмотра планов и их настройки",
                element: <PlansPage/>
            }
        ]
    },
    {
        title: "Настройки", key: "settings", icon: <SettingOutlined/>, routes: [
            {
                title: "Настройки хоста",
                path: "/settings",
                hint: "На этой странице можно настроить точку монтирования",
                element: <SettingsPage/>
            },
            {
                title: "Виджеты",
                path: "/widgets",
                hint: "На этой странице представлены все возможные виджеты, которые можно закрепить",
                element: <WidgetsPage/>
            }
        ]
    }
]