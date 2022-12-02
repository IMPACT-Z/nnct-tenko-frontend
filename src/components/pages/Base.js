import Base from "../Base"; 

const PageBase = ({authType, backgroundClassName, inner}) => {
    return (
        <Base 
            authType={authType}
            inner={
                <div
                    className={`min-h-screen pt-24 pb-8 ${backgroundClassName}`}
                >
                    {inner}
                </div>
            }
            
        />
    )    
}

export default PageBase;
