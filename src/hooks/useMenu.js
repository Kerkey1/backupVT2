import {useEffect, useState} from "react";
import {PagesData} from "../constants/PagesContent";

const useMenu = () => {
    const [opened, setOpened] = useState([])

    useEffect(() => {
        PagesData.forEach(pd => {
            if (pd.routes.some(route => route.path === location.pathname))
                setOpened(prev => ([...prev, pd.key]))
        })
    }, []);

    const isOpened = (key) => opened.includes(key)
    const handleMenuClick = (key) => opened.includes(key)?setOpened(opened.filter(sm => sm !== key)):setOpened([...opened, key]);

    return [isOpened, handleMenuClick]
};
export default useMenu;