import React from "react";
import {useNavigate} from "react-router";

const SubMenuItem = ({path, title}) => {
    const navigate = useNavigate();
    const onClick = () => navigate(path)
    return <li className={location.pathname === path ? "submenu-item active" : "submenu-item"} onClick={onClick}>
        <span className="text">
              {title}
        </span>
    </li>
}
export default SubMenuItem;