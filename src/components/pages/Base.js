import React from 'react';
import { useOutletContext } from "react-router-dom";

import Base from "../Base"; 

const PageBase = React.memo(({authType, backgroundClassName, innerHTML}) => {
    const { pageBaseClassName } = useOutletContext();
    return (
        <Base 
            authType={authType}
            innerHTML={
                <div
                    className={`${pageBaseClassName} ${backgroundClassName}`}
                >
                    {innerHTML}
                </div>
            }
        />
    )    
});

export default PageBase;
