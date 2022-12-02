import Base from "../Base"; 
import { useOutletContext } from "react-router-dom";

const PageBase = ({authType, backgroundClassName, inner}) => {
    const { pageBaseClassName } = useOutletContext();
    return (
        <Base 
            authType={authType}
            inner={
                <div
                    className={`${pageBaseClassName} bg-white`}
                >
                    {inner}
                </div>
            }
            
        />
    )    
}

export default PageBase;
