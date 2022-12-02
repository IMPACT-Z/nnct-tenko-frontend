import { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from "firebase/auth";

const AUTH_TYPE = {
    AUTH: {
        required: true,
        notRequired: false,
    },
    NOT_AUTH: {
        required: false,
        notRequired: true,
    },
    ANY: {
        required: false,
        notRequired: false,
    }
}

const Base = ({authType, backgroundClassName, contents}) => {
    const navigate = useNavigate();
    const [isDisplay, setIsDisplay] = useState(false);

    useEffect(() => {
        onAuthStateChanged(getAuth(), (currentUser) => {
            switch(authType) {
                case AUTH_TYPE.AUTH:
                    if (currentUser) {
                        setIsDisplay(true);
                    } else {
                        navigate('/auth/login');
                    }
                    break;
                case AUTH_TYPE.NOT_AUTH:
                    if (!currentUser) {
                        setIsDisplay(true);
                    } else {
                        navigate('/');
                    }
                    break;
                case authType === AUTH_TYPE.ANY:
                    setIsDisplay(true);
                    break;
                default:
            }
        });
    }, []);

    if (isDisplay)
        return (
            <div
                className={`min-h-screen pt-24 pb-8 ${backgroundClassName}`}
            >
                {contents}
            </div>
        )
    
}

export default Base;
export {AUTH_TYPE};
