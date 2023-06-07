import React from "react";
import {observer} from "mobx-react";
import HeaderBlock from "./header/HeaderBlock";

const MainContentWrapper = observer(({children}) => {

    return <div className="main-content-wrapper">
        <HeaderBlock/>
        <div className="content">
            {children}
        </div>
    </div>
});
export default MainContentWrapper;