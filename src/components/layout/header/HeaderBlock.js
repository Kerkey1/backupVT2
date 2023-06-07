import React, {useEffect, useState} from "react";
import {observer} from "mobx-react";
import UserActions from "./UserActions";
import {PagesData} from "../../../constants/PagesContent";
import {useLocation} from "react-router";

const HeaderBlock = observer(() => {
    const location = useLocation()
    const [currentRoute, setCurrentRoute] = useState();

    useEffect(() => {
        PagesData.forEach(pd => {
            pd.routes.forEach(route => {
                if (route.path === location.pathname)
                    setCurrentRoute(route)
            })
        })
    }, [location.pathname]);

    return <div className="header-block">
        <span className="route-title">{currentRoute?.title}</span>
        <UserActions currentRoute={currentRoute}/>
    </div>
});
export default HeaderBlock;