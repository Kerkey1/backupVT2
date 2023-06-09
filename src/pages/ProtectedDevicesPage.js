import React, {useEffect, useState} from "react";
import MachineSecurityTable from "../components/tables/MachineSecurityTable";
import {observer} from "mobx-react";
import machineStore from "../stores/MachineStore";
import TopPageSearch from "../components/common/TopPageSearch";
import DrawerTemplate from "../components/common/drawer/DrawerTemplate";
import {
    AlertOutlined,
    CalendarOutlined,
    EyeOutlined,
    InboxOutlined,
    PlusSquareOutlined,
    SettingOutlined
} from "@ant-design/icons";
import BackupsList from "../components/lists/BackupsList";
import PlanCard from "../components/cards/PlanCard";
import planStore from "../stores/PlansStore";
import DrawerSubHeader from "../components/common/drawer/DrawerSubHeader";
import backupStore from "../stores/BackupStore";
import NotificationCardList from "../components/lists/NotificationCardList";
import notificationStore from "../stores/NotificationStore";
import {useNavigate} from "react-router";
import {autorun} from "mobx";
import PlansSettingsModal from "../components/plans/PlansSettingsModal";

const ProtectedDevicesPage = observer(() => {
    const navigate = useNavigate();
    const [machineId, setMachineId] = useState(undefined)

    const [machine, setMachine] = useState()
    const [plan, setPlan] = useState()
    const [backups, setBackups] = useState()
    const [notifications, setNotification] = useState()
    const [open, setOpen] = useState(false)
    const [machineName, setMachineName] = useState('')
    const [disabled, setDisabled] = useState(false)
    const [nextBackup, setNextBackup] = useState()

    useEffect(() => {
        const disposer = autorun(() => {
            setMachine(machineStore.getById(machineId))
            setPlan(planStore.getPlanByMachineId(machineId))
            setBackups(backupStore.getByMachineId(machineId))
            setNotification(notificationStore.filterByMachineId(machineId))
        });
        return () => disposer()
    }, [machineId])

    useEffect(() => {
        if (plan)
            setNextBackup(planStore.getNextBackup(machineId))
        return () => setNextBackup(undefined)
    }, [plan])

    const onClose = () => setMachineId(undefined)

    const makeCopy = () => {
        setDisabled(true)
        backupStore.backup(machineId).then(() =>
            setDisabled(false)
        );
    }

    const viewAll = () => navigate("/notifications")
    const handleOpenPlan = () => setOpen(true)
    const menu = [
        {
            key: "backupsList",
            title: "Резервные копии",
            icon: <InboxOutlined/>,
            content: <>
                <DrawerSubHeader
                    text={backups?.length > 0 ? `Всего резервных копий: ${backups.length}` : `Резервных копий`}
                    action={<><PlusSquareOutlined/> Создать резервную копию</>}
                    disabled={disabled}
                    onActionClick={() => makeCopy()}
                />
                <BackupsList backups={backups} machineId={machineId}/>
            </>
        },
        {
            key: "notifications",
            title: "Оповещения",
            icon: <AlertOutlined/>,
            content: <>
                <DrawerSubHeader
                    text={`Всего уведомлений: ${notifications?.length ?? 0}`}
                    action={<><EyeOutlined/> Посмотреть для всех устройств</>}
                    onActionClick={viewAll}
                />
                <NotificationCardList notifications={notifications}/>
            </>
        },
        {
            key: "plan",
            title: "Планы",
            icon: <CalendarOutlined/>,
            content: <>
                <DrawerSubHeader
                    text={nextBackup ? `Следующий бэкап: ${nextBackup}` : "План не задан"}
                    action={<><SettingOutlined/> Настроить план</>}
                    onActionClick={handleOpenPlan}
                />
                <PlanCard plan={plan}/>
            </>
        }
    ]

    const title = (currentItem) => <>
        <span className="drawer-plans-title">{machine?.name}</span> - {menu.find(m => m.key === currentItem).title}
    </>

    return <>
        <TopPageSearch value={machineName} onChange={setMachineName}/>
        <div className="divider-block"/>
        <MachineSecurityTable dataSource={machineStore.findMachinesByName(machineName)} onRowClick={setMachineId}/>
        <DrawerTemplate
            visible={machineId}
            title={(currentItem) => title(currentItem)}
            menu={menu} onClose={onClose}/>
        <PlansSettingsModal machineId={machineId} open={open} setOpen={setOpen}/>
    </>

})
export default ProtectedDevicesPage;