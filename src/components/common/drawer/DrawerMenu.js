import React from "react";
import {Tooltip} from "antd";

const DrawerMenu = ({menu, currentItem, onItemClick}) => {
    return <div className="drawer-menu-wrapper">
        {menu.map(i =>
            <Tooltip placement="left" key={i.key} title={i.title}>
                <div onClick={() => onItemClick(i.key)}
                     className={currentItem === i.key ? "drawer-menu-item active-drawer-item" : "drawer-menu-item"}>{i.icon}</div>
            </Tooltip>)}
    </div>
};
export default DrawerMenu