import React from "react";

const DrawerSubHeader = ({text, action, disabled, onActionClick}) => {
    const onClick = () => {
        if (onActionClick instanceof Function)
            onActionClick()
    }
    return <div className="drawer-subtitle">
        <span className={"text"}>{text}</span>
        {action && <div onClick={onClick} className={!disabled ? "action" : "action disabled"}>{action}</div>}
    </div>
}
export default DrawerSubHeader