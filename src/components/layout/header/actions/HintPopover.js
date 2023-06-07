import React from "react";
import {QuestionCircleOutlined} from "@ant-design/icons";
import {Popover} from "antd";

const HintPopover = ({title, hint}) => <Popover
    placement="bottomRight"
    title={title}
    content={hint}
    className="cursor-pointer">
    <QuestionCircleOutlined/>
</Popover>

export default HintPopover