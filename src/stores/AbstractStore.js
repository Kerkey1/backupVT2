import {action, makeObservable, observable} from "mobx";
import {UpdateEnum} from "../constants/enums/UpdateStoreEnum";
import {getSession} from "../utils";
import {notifications} from "../components/common/notification";
import {StatusEnum} from "../constants/enums/StatusEnum";

const array = require("lodash/array");

class AbstractStore {
    @observable data = observable.array([]);

    constructor() {
        makeObservable(this);
    }

    @action insertId(request, id) {
        return {
            ...request,
            link: request.link + id
        }
    }

    @action updateData(data, updateType = UpdateEnum.Full, id) {
        switch (updateType) {
            case UpdateEnum.Full:
                this.data = data
                break;
            case  UpdateEnum.Single:
                this.data.push(data)
                break;
            case UpdateEnum.Delete:
                this.data.splice(this.data.findIndex(v => v.id === id), 1)
                break;
            case UpdateEnum.Update:
                this.data.splice(this.data.findIndex(v => v.id === data.id), 1, data)
                break;
            case UpdateEnum.Response:
                return data
        }
    }

    @action getNotification(status, notificationsArray) {
        const notification = notificationsArray.find(n => n.status === status)
        if (notification)
            notifications(notification.type, status, notification.description)
    }

    @action
    async doFetch(request, rawBody) {
        const session = getSession();
        const body = !request.session ? JSON.stringify(rawBody) : JSON.stringify({...rawBody, ...session})
        const response = await fetch(request.link, {
            method: request.method,
            headers: request.headers ?? {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body
        })

        if (!response.ok) response.clone().json().then(v => notifications(StatusEnum.Error, response.status, v ?? response.statusText))
        if (request?.notification && request?.notifications?.length > 0) this.getNotification(response.status, request.notifications)
        else if (request?.notification) response.clone().json().then(res => notifications(StatusEnum.Success, response.status, res))

        return response
    }

    @action
    async get(request) {
        const response = await this.doFetch(request)
        return response.json().then(data => this.updateData(data))
    }

    @action
    async post(request, update = UpdateEnum.Full, body) {
        const response = await this.doFetch(request, body)
        return response.json().then(data => this.updateData(data, update))
    }

    @action
    async delete(id, request, body) {
        const response = await this.doFetch(request, body)
        return response.json().then(data => this.updateData(data, UpdateEnum.Delete, id));
    }

    @action
    async put(request, body) {
        const response = await this.doFetch(request, body)
        return response.json().then(data => this.updateData(data, UpdateEnum.Update));
    }

    getById(id) {
        return this.data.find(v => v.id === id)
    }
}

export default AbstractStore;
