import React, {useState} from "react";
import {PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip} from 'recharts';
import {ColorEnum} from "../../../constants/enums/ColorEnum";

const TwoCircleTemplate = ({data, totalData, legendPayloads, tooltipFormatter}) => {
    const [activeIndex, setActiveIndex] = useState();
    const onPieEnter = (data, index) => {
        setActiveIndex(index);
    };

    const onPieLeave = () => {
        setActiveIndex(undefined);
    };
    return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap'}}>
        <ResponsiveContainer width="100%" height={220}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={60}
                    labelLine={false}
                    startAngle={90}
                    endAngle={450}
                    onMouseEnter={onPieEnter}
                    onMouseLeave={onPieLeave}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color}/>

                    ))}
                </Pie>
                <Pie
                    data={totalData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    labelLine={false}
                    startAngle={90}
                    endAngle={-270}

                >
                    <Cell fill={ColorEnum.ActiveMainColor}/>
                </Pie>
                <Tooltip
                    formatter={(value) => tooltipFormatter(value)} isAnimationActive={false}
                         animationEasing="ease-out" animationDuration={200}/>
                <Legend
                    payload={legendPayloads}
                    align="right"
                    iconSize={20}
                    wrapperStyle={{padding: "30px"}}
                    layout="vertical"
                    verticalAlign="middle"/>
            </PieChart>
        </ResponsiveContainer>
    </div>
};
export default TwoCircleTemplate;