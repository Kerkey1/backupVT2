import AbstractStore from "./AbstractStore";
import {action} from "mobx";
import {requests} from "./Links";
import {UpdateEnum} from "../constants/enums/UpdateStoreEnum";

class ConnectStore extends AbstractStore {
    constructor() {
        super();
    }

    @action testConnection(object) {
        return connectStore.post(requests.testConnect, UpdateEnum.Response, object)
    }
}

const connectStore = new ConnectStore();
export default connectStore;