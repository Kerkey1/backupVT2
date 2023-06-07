import AbstractStore from "./AbstractStore";
import {action} from "mobx";
import {requests} from "./Links";
import {UpdateEnum} from "../constants/enums/UpdateStoreEnum";
import {MonthsEnum} from "../constants/enums/MonthsEnum";

class BackupStore extends AbstractStore {
    constructor() {
        super();
    }

    @action getAllBackups() {
        return this.post(requests.getAllBackups, UpdateEnum.Full)
    }

    @action backup(id) {
        return this.post(this.insertId(requests.soloBackup, id), UpdateEnum.Response)
    }

    @action
    async deleteBackup(body) {
        return this.post(requests.deleteBackup, UpdateEnum.Response, body);
    }

    getByMachineId(id) {
        const filteredData = this.data.filter(v => v.id === id)
        return filteredData.length === 0 ? undefined : filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    getLastBackup(machineId) {
        const filteredData = this.data.filter(item => item.id === machineId);
        if (filteredData.length === 0)
            return "Бэкапы отсутствуют"
        const sortedData = filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
        const newestRecord = new Date(sortedData.shift().date);
        return newestRecord.getDate() + " " + MonthsEnum.AlternateName[newestRecord.getMonth()]
    }

    //
    // getBackupByYearAndMonth(year, month) {
    //     let count = 0;
    //     this.data.forEach(el => {
    //         const date = new Date(el.date);
    //         if (date.getFullYear() === year && date.getMonth() === month)
    //             count++;
    //     })
    //     return count;
    // }

}

const backupStore = new BackupStore();
export default backupStore;