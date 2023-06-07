import React from "react";
import SubMenuItem from "./SubMenuItem";

const MenuItem = ({item, isOpened, onClick}) => <>
    <li className="menu-item">
        <span className="text" onClick={() => onClick(item.key)}>
            {item.icon}
            <span className="item-title">{item.title}</span>
        </span>
    </li>
    <ul className={isOpened ? "expanded" : "unexpanded"}>
        {item?.routes.map(route => <SubMenuItem key={route.path} title={route.title} path={route.path}/>)}
    </ul>
</>
export default MenuItem;