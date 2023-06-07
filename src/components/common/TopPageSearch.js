import React, {useState} from "react";
import Input from "antd/es/input/Input";
import {FilterOutlined, SearchOutlined} from "@ant-design/icons";
import FiltersBlock from "./FiltersBlock";

const TopPageSearch = ({value, onChange, filters}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);

    return <>
        <div className="top-page-search">
            {filters && <FilterOutlined className="top-page-search-icon cursor-pointer" onClick={toggleDropdown}/>}
            <Input
                bordered={false}
                placeholder="Поиск"
                prefix={<SearchOutlined className="top-page-search-icon"/>}
                value={value}
                onChange={e => onChange(e.target.value)}/>
        </div>
        {isOpen && filters && <>
            <div className="divider-block"/>
            <FiltersBlock filters={filters}/></>}
    </>

};
export default TopPageSearch;