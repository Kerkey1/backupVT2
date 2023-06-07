import React from "react";

const FiltersBlock = ({filters}) => <div className={`dropdown-content`}>
    <h2>Фильтры</h2>
    {filters.map(filter =>
        <span key={filter.key} className="filter-item">
                <span>{`${filter.title}:`}</span>
                <span className="ml-6">{filter.content}</span>
            </span>
    )}
</div>

export default FiltersBlock;