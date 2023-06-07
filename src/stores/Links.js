import {StatusEnum} from "../constants/enums/StatusEnum";

//const hostName = "http://172.16.70.244/api/"; //test
const hostName = "http://" + window.location.host + "/api/" //prod

export const requests = {
    // machines
    getAllMachines: {
        link: hostName + "machine",
        method: "POST",
        session: true,
        notification: false,
        headers: undefined,
    },
    machineRecovery: {
        link: hostName + "machine/recovery",
        method: "POST",
        session: true,
        notification: false,
        headers: undefined
    },
    startMachine: {
        link: hostName + "machine/start/",
        method: "POST",
        session: true,
        notification: true,
        headers: undefined,
        notifications: [
            {
                status: 200,
                description: "Машина успешно запущена",
                type: StatusEnum.Success
            }
        ]
    },
    stopMachine: {
        link: hostName + "machine/stop/",
        method: "POST",
        session: true,
        notification: true,
        headers: undefined,
        notifications: [
            {
                status: 200,
                description: "Машина успешно перезагружена",
                type: StatusEnum.Success
            }
        ]
    },
    rebootMachine: {
        link: hostName + "machine/reboot/",
        method: "POST",
        session: true,
        notification: true,
        headers: undefined,
        notifications: [
            {
                status: 200,
                description: "Машина успеншно перезагружена",
                type: StatusEnum.Success
            }
        ]
    },

    //plans
    getAllPlans: {link: hostName + "plan/all", method: "GET", session: false, notification: false, headers: undefined},
    createPlan: {link: hostName + "plan", method: "POST", session: true, notification: false, headers: undefined},
    deletePlan: {link: hostName + "plan/", method: "DELETE", session: true, notification: false, headers: undefined},
    updatePlan: {link: hostName + "plan", method: "PUT", session: true, notification: false, headers: undefined},

    //connect
    testConnect: {
        link: hostName + "connect",
        method: "POST",
        session: false,
        notification: true,
        headers: undefined,
        notifications: [
            {
                status: 200,
                description: "Подключение успешно выполнено",
                type: StatusEnum.Success
            }
        ]
    },

    //notification
    getAllNotifications: {
        link: hostName + "notification/all",
        method: "GET",
        session: false,
        notification: false,
        headers: undefined
    },
    createNotification: {
        link: hostName + "notification",
        method: "POST",
        session: false,
        notification: false,
        headers: undefined
    },
    deleteNotification: {
        link: hostName + "notification/",
        method: "DELETE",
        session: false,
        notification: true,
        headers: undefined,
        notifications: [
            {
                status: 200,
                description: "Уведомление успешно удалено",
                type: StatusEnum.Success
            }
        ]
    },
    updateNotification: {
        link: hostName + "notification",
        method: "PUT",
        session: false,
        notification: false,
        headers: undefined
    },

    //backups
    getAllBackups: {
        link: hostName + "backup/list",
        method: "POST",
        session: true,
        notification: false,
        headers: undefined
    },
    soloBackup: {
        link: hostName + "backup/",
        method: "POST",
        session: true,
        notification: true,
        headers: undefined,
        notifications: [
            {
                status: 200,
                description: "Создание резервной копии запущено",
                type: StatusEnum.Success
            }
        ]
    },
    deleteBackup: {
        link: hostName + "backup/delete",
        method: "POST",
        session: true,
        notification: true,
        headers: undefined,
        notifications: [
            {
                status: 200,
                description: "Бэкап успешно удален",
                type: StatusEnum.Success
            }
        ]
    },

    //file
    updateMountPoint: {link: hostName + "file", method: "POST", session: true, notification: false, headers: undefined}
}
