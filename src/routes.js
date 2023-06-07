import React from "react";
import {Navigate, useRoutes} from "react-router";
import {PagesData} from "./constants/PagesContent";
import {sessionExist} from "./utils";
import LoginPage from "./pages/LoginPage";

const Router = () => {
    const importantRoutes = [
        {path: "/login", element: <LoginPage/>},
        {path: "/*", element: <>NotFound</>}
    ]

    const dynamicRoutes = PagesData.flatMap(pd =>
        pd.routes.map(r => {
            return {path: r.path, element: sessionExist() ? r.element : <Navigate to='/login'/>}
        })
    )

    return useRoutes([...dynamicRoutes, ...importantRoutes])
};
export default Router
