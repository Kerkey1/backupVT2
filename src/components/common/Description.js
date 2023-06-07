import React from "react";

const Description = ({label, description}) => {

    return <span className="description-block">
        <span className="description-block-label">{label}</span>
        :
        <span className="description-block-description">{description}</span>
    </span>
}
export default Description;