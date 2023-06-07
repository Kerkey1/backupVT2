import React from "react";
import {observer} from "mobx-react";
import {useState} from "react";
import {Button, Result} from "antd";
import {fromBackupDate} from "../../utils";
import machineStore from "../../stores/MachineStore";
import backupStore from "../../stores/BackupStore";

const BackupsList = observer(({backups}) => {
    const [expanded, setExpanded] = useState(false)

    const handleExpand = (id) => {
        if (expanded === id) {
            setExpanded(null);
        } else {
            setExpanded(id);
        }
    };

    const string = (name, date, id) => `${name}-${fromBackupDate(date, "recovery")}-${id}.xva`
    const handleRestore = (backup) => machineStore.recovery({
        id: backup.id,
        path: string(backup.name, backup.date, backup.id),
        name: backup.name
    })

    const handleDelete = (backup) => backupStore.deleteBackup({
        id: backup.id,
        path: string(backup.name, backup.date, backup.id),
        name: backup.name
    }).then(() => backupStore.data.splice(backupStore.data.indexOf(backup), 1))

    return backups?.length > 0 ?
        <div className="timeline">
            {backups?.map((item, index) => (
                <div key={index} className={`timeline-background ${expanded === index ? "active" : ""}`}>
                    <div className={`timeline-item-wrapper`}>
                        <div
                            className={`timeline-item ${expanded === index ? "active" : ""}`}
                            onClick={() => handleExpand(index)}>
                            <span className="timeline-item-title">{fromBackupDate(item.date, "timelineTitle")}</span>
                            {expanded === index &&
                            <>
                                <br/>
                                <br/>
                                <p>Устройство: {item.name}</p>
                                <Button type="primary" onClick={() => handleRestore(item)}>Восстановить</Button>
                                <Button
                                    style={{marginLeft: "6px"}}
                                    onClick={() => handleDelete(item)}>
                                    Удалить бэкап
                                </Button>
                            </>}
                        </div>
                    </div>
                </div>))}
        </div> :
        <Result title="Бэкапы отстутсвуют"/>

})
export default BackupsList;