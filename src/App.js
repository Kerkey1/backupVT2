import React, {useEffect} from "react";
import {observer} from "mobx-react";
import Router from "./routes";
import 'antd/dist/reset.css';
import './App.css';
import {useLocation} from "react-router";
import Sidebar from "./components/layout/Sidebar";
import MainContentWrapper from "./components/layout/MainContentWrapper";
import {getSession} from "./utils";
import machineStore from "./stores/MachineStore";
import planStore from "./stores/PlansStore";
import backupStore from "./stores/BackupStore";
import notificationStore from "./stores/NotificationStore";

const App = observer(() => {
    const location = useLocation();

    useEffect(() => {
        const session = getSession();
        if (session) {
            machineStore.getAllMachines()
            planStore.getAllPlans()
            backupStore.getAllBackups()
            notificationStore.getAllNotifications()
        }
    }, [location?.pathname])

    return <>
        <Sidebar/>
        <MainContentWrapper>
            <Router/>
        </MainContentWrapper>
    </>

});
export default App