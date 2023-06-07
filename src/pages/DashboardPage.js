import React, {useRef, useState} from "react";
import useWidgets from "../hooks/useWidgets";
import WidgetWrapper from "../components/widgets/WidgetWrapper";


const DashboardPage = () => {
    const [widgets, setWidgets, pined, getWidgetContent, handlePin, handleUnpin, setWidgetsStore] = useWidgets();

    const dragzoneRef = useRef(null);
    const blocksRef = useRef([]);

    const [draggedBlock, setDraggedBlock] = useState(null);
    const [dragOffsetX, setDragOffsetX] = useState(0);
    const [dragOffsetY, setDragOffsetY] = useState(0);

    function handleDragStart(event) {
        const {target, clientX, clientY} = event;
        setDraggedBlock(target);
        setDragOffsetX(clientX - target.offsetLeft);
        setDragOffsetY(clientY - target.offsetTop);
    }

    function handleDragEnd() {
        setDraggedBlock(null);
        setWidgetsStore(widgets);
        setDragOffsetX(0);
        setDragOffsetY(0);
    }

    function handleDragOver(event, wrapperIndex) {
        event.preventDefault();
        const dragIndex = blocksRef.current.indexOf(draggedBlock);
        const tmpBlocks = widgets.slice();
        const block = tmpBlocks.splice(dragIndex, 1)[0];
        if (block) {
            tmpBlocks.splice(wrapperIndex, 0, block);
            setWidgets(tmpBlocks);
        }
    }

    return <div className={`widgets-page ${draggedBlock ? "drag-zone" : ""}`} ref={dragzoneRef}>
        {widgets.map((widget, index) => {
            const content = getWidgetContent(widget);
            const wrapperRef = element => (blocksRef.current[index] = element);
            return <WidgetWrapper
                widget={content}
                key={widget}
                refLink={wrapperRef}
                draggable={true}
                handlePin={handlePin}
                handleUnpin={handleUnpin}
                pined={pined(widget)}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                index={index}
                active={draggedBlock === blocksRef.current[index] && "active"}
                onDragOver={(event) => handleDragOver(event, index)}

            />
        })}
    </div>
}
export default DashboardPage;