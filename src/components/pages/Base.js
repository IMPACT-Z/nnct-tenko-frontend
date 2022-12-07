import React from 'react';
import { useOutletContext } from "react-router-dom";

import Base from "../Base"; 

const PageBase = React.memo(({authType, backgroundClassName, inner}) => {
    const { pageBaseClassName } = useOutletContext();
    return (
        <Base 
            authType={authType}
            inner={
                <div
                    className={`${pageBaseClassName} ${backgroundClassName}`}
                >
                    {inner}
                </div>
            }
        />
    )    
});

export default PageBase;
