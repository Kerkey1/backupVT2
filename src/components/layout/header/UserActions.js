import React from "react";
import {observer} from "mobx-react";
import HintPopover from "./actions/HintPopover";
import SessionPopover from "./actions/SessionPopover";
import NotificationPopover from "./actions/NotificationPopover";

const UserActions = observer(({currentRoute}) => <div className="user-actions-wrapper">
    <HintPopover title={currentRoute?.title} hint={currentRoute?.hint}/>
    <NotificationPopover/>
    <SessionPopover/>
</div>);
export default UserActions