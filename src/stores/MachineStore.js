import AbstractStore from "./AbstractStore";
import {action} from "mobx";
import {requests} from "./Links";
import planStore from "./PlansStore";
import {UpdateEnum} from "../constants/enums/UpdateStoreEnum";

class MachineStore extends AbstractStore {
    constructor() {
        super();
    }

    @action getAllMachines() {
        return this.post(requests.getAllMachines, UpdateEnum.Full)
    }

     getById(id) {
        return this.data.find(v => v.uuid === id)
    }

    @action recovery(object) {
        return this.post(requests.machineRecovery, UpdateEnum.Response, object)
    }

    @action stop(id) {
        return this.post(this.insertId(requests.stopMachine, id), UpdateEnum.Response)
    }

    @action start(id) {
        return this.post(this.insertId(requests.startMachine, id), UpdateEnum.Response)
    }

    @action reboot(id) {
        return this.post(this.insertId(requests.rebootMachine, id), UpdateEnum.Response)
    }

    findMachinesByName(name) {
        return name === "" ? this.data : this.data.filter(machine => machine.name.toLowerCase().includes(name.toLowerCase()))
    }

    filterMachines(name, backup) {
        const data = this.findMachinesByName(name)
        return backup ? data.filter(machine => planStore.getPlanByMachineId(machine.uuid)) : data
    }

    @action changeMachineStatus(id, state) {
        const index = this.data.findIndex(source => source.uuid === id);
        let temp = this.data
        temp[index].state = state;
        this.data = [...temp];
    }
}

const machineStore = new MachineStore();
export default machineStore;