import AbstractStore from "./AbstractStore";
import {action} from "mobx";
import {requests} from "./Links";
import machineStore from "./MachineStore";
import {UpdateEnum} from "../constants/enums/UpdateStoreEnum";

class NotificationStore extends AbstractStore {
    constructor() {
        super();
    }

    @action getAllNotifications() {
        return this.get(requests.getAllNotifications)
    }

    @action createNotification(body) {
        return this.post(requests.createNotification, body, UpdateEnum.Single)
    }

    @action updateNotifications(body) {
        return this.put(requests.updateNotification, body)
    }

    @action deleteNotifications(id, body) {
        return this.delete(id, this.insertId(requests.deleteNotification, id), body)
    }

    sortByDate(count) {
        const sortedData = this.data.slice().sort((a, b) => new Date(b.data) - new Date(a.data))
        return !count ? sortedData : sortedData.slice(0, count)
    }

    filterByMachineId(machineId) {
        const sorted = this.sortByDate()
        return sorted?.length > 0 ? sorted.filter(s => s.machine === machineId) : []
    }

    sortFilterSearch(name, statusFilter) {
        let notifications = this.sortByDate()?.map(not => {
            return {
                ...not,
                machineName: machineStore.getById(not.machine)?.name
            }
        })

        notifications = name === "" ? notifications : notifications.filter(not => not?.machineName && not?.machineName?.toLowerCase().includes(name.toLowerCase()))
        notifications = !statusFilter ? notifications : notifications.filter(not => not?.typeMessage === statusFilter)
        return notifications
    }
}

const notificationStore = new NotificationStore();
export default notificationStore;