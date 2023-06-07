import React, {useState} from "react";
import {PagesData} from "../../../constants/PagesContent";
import MenuItem from "./MenuItem";
import useMenu from "../../../hooks/useMenu";


const MenuList = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [isOpened, handleMenuClick] = useMenu();

    return <ul className="menu-list">
        {PagesData.map(pd => <MenuItem key={pd.key} isOpened={isOpened(pd.key)} item={pd} onClick={handleMenuClick}/>)}
    </ul>
}
export default MenuList;