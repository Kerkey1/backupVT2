import React, {useEffect, useState} from "react";

const useColumns = (columnsArray, stores) => {
    const [columns, setColumns] = useState([])
    useEffect(() => setColumns([...columnsArray]), [stores.map(s => s.data)])
    return columns
}
export default useColumns;