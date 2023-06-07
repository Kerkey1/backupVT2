import AbstractStore from "./AbstractStore";
import {action} from "mobx";
import {requests} from "./Links";
import {UpdateEnum} from "../constants/enums/UpdateStoreEnum";
import {compoundYears, nextEventDateSwitch} from "../utils";
import {MonthsEnum} from "../constants/enums/MonthsEnum";

class PlanStore extends AbstractStore {
    constructor() {
        super();
    }

    @action getAllPlans(object) {
        return planStore.get(requests.getAllPlans, object)
    }

    @action createPlan(object) {
        return planStore.post(requests.createPlan, UpdateEnum.Single, object)
    }

    @action updatePlan(object) {
        return planStore.put(requests.updatePlan, object)
    }

    @action deletePlan(id) {
        return planStore.delete(id, this.insertId(requests.deletePlan, id))
    }

    getPlanByMachineId(machineId) {
        return this.data.find(plan => plan.machines === machineId)
    }

    getNextBackup(machineId) {
        const plan = this.getPlanByMachineId(machineId)
        if (!plan)
            return "План не задан"

        let nextEventDate;
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentDayOfWeek = currentDate.getDay();

        if (plan.dayOfMonth !== undefined) {
            nextEventDate = nextEventDateSwitch(currentDate, plan.dayOfMonth);
            nextEventDate.setDate(nextEventDate.getDate() + (plan.dayOfWeek - nextEventDate.getDay() + 7) % 7);

            if (nextEventDate.getFullYear() !== currentYear)
                nextEventDate.setFullYear(compoundYears(nextEventDate.getFullYear(), currentYear))

            if (currentDate.getTime() >= nextEventDate.getTime()) {
                nextEventDate = nextEventDateSwitch(currentDate, plan.dayOfMonth, 1);
                nextEventDate.setDate(nextEventDate.getDate() + (plan.dayOfWeek - nextEventDate.getDay() + 7) % 7);

                if (nextEventDate.getFullYear() !== currentYear)
                    nextEventDate.setFullYear(compoundYears(nextEventDate.getFullYear(), currentYear))
            }
        } else if (plan.dayOfWeek !== undefined) {
            let daysUntilNextEvent = currentDayOfWeek >= plan.dayOfWeek ? (7 - currentDayOfWeek + plan.dayOfWeek) : (plan.dayOfWeek - currentDayOfWeek);
            nextEventDate = new Date(currentDate.getTime() + daysUntilNextEvent * 24 * 60 * 60 * 1000);

            if (nextEventDate.getMonth() !== currentDate.getMonth()) {
                nextEventDate.setDate(1);
                nextEventDate.setMonth(nextEventDate.getMonth() + 1);
            }
        } else {
            nextEventDate = new Date();
        }

        return nextEventDate.getDate() + " " + MonthsEnum.AlternateName[nextEventDate.getMonth()]
    }
}

const planStore = new PlanStore();
export default planStore;