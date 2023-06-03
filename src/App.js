import React, {useEffect} from "react";
import {observer} from "mobx-react";
import Router from "./routes";
import MainMenu from "./components/menu/MainMenu";
import 'antd/dist/reset.css';
import './styles/App.css';
import MainWrapper from "./components/wrapper/MainWrapper";
import {getAllData} from "./GlobalFunctions";
import {useLocation} from "react-router";

const App = observer(() => {
    const location = useLocation();

    useEffect(() => {
        getAllData()
    }, [location?.pathname])

    return <div className="main">
        <div className="sider-wrapper">
            <MainMenu/>
        </div>
        <MainWrapper>
            <Router/>
        </MainWrapper>
    </div>

});
export default App