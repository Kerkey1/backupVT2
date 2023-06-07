import React, {useState} from "react";
import {WidgetSizeEnum} from "../../constants/enums/WidgetSizeEnum";
import {CloseOutlined, PushpinOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import {Tooltip} from "antd";

const WidgetWrapper = ({
                           refLink,
                           widget,
                           handlePin,
                           handleUnpin,
                           draggable,
                           onDragStart,
                           onDragOver,
                           onDragEnd,
                           pined,
                           active = "",
                           index
                       }) => {

    return <div
        ref={refLink}
        draggable={draggable}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
        data-index={index}
        className={`widget-wrapper ${widget.size === WidgetSizeEnum.FullWidth ? "widget-full-width" : "widget-half-width"} ${active}`}>
        <div className="widget-header">
            <span>{widget.title}</span>
            <div className="widget-actions">
                <Tooltip
                    placement="left"
                    title={widget?.hint}
                >
                    <QuestionCircleOutlined className="cursor-pointer"/>
                </Tooltip>
                {pined ? <Tooltip
                    placement="left"
                    title="Открепить от панели задач">
                    <CloseOutlined className="cursor-pointer pin" onClick={() => {
                        handleUnpin(widget.key)
                    }}/>
                </Tooltip> : <Tooltip placement="left" title="Закрепить на панели задач">
                    <PushpinOutlined className="cursor-pointer pin" onClick={() => {
                        handlePin(widget.key)
                    }}/>
                </Tooltip>}
            </div>
        </div>
        <div className="widget-content" style={widget.styles}>
            {widget.content}
        </div>
        <div className="widget-footer"/>
    </div>
}
export default WidgetWrapper;