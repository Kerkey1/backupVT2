import React, {useState} from "react";
import {observer} from "mobx-react";
import {Drawer} from "antd";
import DrawerMenu from "./DrawerMenu";
import DrawerContent from "./DrawerContent";

const DrawerTemplate = observer(({visible, onClose, title, menu, content}) => {
    const [currentItem, setCurrentItem] = useState(menu?.length > 0 ? menu[0]?.key : undefined)
    const curContent = menu ? menu.find(m => m.key === currentItem)?.content : content;
    const customTitle = () => title instanceof Function ? title(currentItem) : title

    return <Drawer
        title={customTitle()}
        placement="right"
        closable={true}
        onClose={onClose}
        className="drawer-template"
        open={visible}
        width={700}
    >
        {menu && <DrawerMenu menu={menu} currentItem={currentItem} onItemClick={setCurrentItem}/>}
        <DrawerContent content={curContent}/>
    </Drawer>
});
export default DrawerTemplate