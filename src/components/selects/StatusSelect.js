import React from "react";
import {Select} from "antd";
import {StatusEnum} from "../../constants/enums/StatusEnum";
import {StatusEnumTranslation} from "../../constants/enumTranslations/StatusEnumTranslation";

const StatusSelect = ({value, onChange}) => {
    return <Select
        value={value}
        onChange={onChange}
        allowClear
        style={{
            width: 200,
        }}
        options={Object.keys(StatusEnum).map(key => ({value: key, label: StatusEnumTranslation[key]}))}
    />

}
export default StatusSelect;