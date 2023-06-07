import React, {useEffect, useState} from "react";
import {WidgetsData} from "../constants/WidgetsData";

const useWidgets = () => {
    const [widgets, setWidgets] = useState([]);

    useEffect(() => {
        const w = getWidgetsStore()
        if (w && w?.length > 0) {
            const widgetsFromStore = Array.from(JSON.parse(w))
            const checkedWidgets = widgetsFromStore.filter(widget => WidgetsData.some(v => v.key === widget))
            if (checkedWidgets.length !== widgetsFromStore.length)
                setWidgetsStore(checkedWidgets)
            setWidgets(checkedWidgets)
        }
    }, [])

    const getWidgetsStore = () => localStorage.getItem("widgets")
    const setWidgetsStore = (array) => localStorage.setItem("widgets", JSON.stringify(array))
    const getWidgetContent = (key) => WidgetsData.find(widget => widget.key === key)
    const pined = (key) => widgets.includes(key)

    const updateWidgets = (array) => {
        setWidgets(array)
        setWidgetsStore(array)
    }

    const handlePin = (key) => {
        let w = [...widgets, key]
        updateWidgets(w)
    }

    const handleUnpin = (key) => {
        let w = widgets.filter(p => p !== key)
        updateWidgets(w)
    }


    return [widgets, setWidgets, pined, getWidgetContent, handlePin, handleUnpin, setWidgetsStore]
}
export default useWidgets;