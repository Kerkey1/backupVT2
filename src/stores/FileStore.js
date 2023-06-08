import AbstractStore from "./AbstractStore";
import {requests} from "./Links";
import {action} from "mobx";
import {UpdateEnum} from "../constants/enums/UpdateStoreEnum";

class FileStore extends AbstractStore {
    constructor() {
        super();
    }

    @action updateMountPoint(object) {
        return this.post(requests.updateMountPoint, UpdateEnum.Response, object)
    }
}

const fileStore = new FileStore();
export default fileStore