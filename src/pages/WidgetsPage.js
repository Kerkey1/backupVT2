import React from "react";
import {WidgetsData} from "../constants/WidgetsData";
import WidgetWrapper from "../components/widgets/WidgetWrapper";
import useWidgets from "../hooks/useWidgets";

const WidgetsPage = () => {
    const [widgets, setWidgets, pined, getWidgetContent, handlePin, handleUnpin, setWidgetsStore] = useWidgets();

    return <div className="widgets-page">
        {WidgetsData.map(widget => <WidgetWrapper
            widget={widget}
            key={widget.key}
            handlePin={handlePin}
            handleUnpin={handleUnpin}
            pined={pined(widget.key)}
        />)}
    </div>
}
export default WidgetsPage;