import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { onAuthStateChangedByCallback } from '../functions/auth'


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

const Base = ({authType, inner}) => {
    const navigate = useNavigate();
    const [isDisplay, setIsDisplay] = useState(false);

    useEffect(() => {
        onAuthStateChangedByCallback(user => {
            switch(authType) {
                case AUTH_TYPE.AUTH:
                    if (user) {
                        setIsDisplay(true);
                    } else {
                        navigate('/auth/login');
                    }
                    break;
                case AUTH_TYPE.NOT_AUTH:
                    if (!user) {
                        setIsDisplay(true);
                    } else {
                        navigate('/roll-call/do');
                    }
                    break;
                case authType === AUTH_TYPE.ANY:
                    setIsDisplay(true);
                    break;
                default:
            }
        });
    });

    if (isDisplay)
        return inner;
}

export default Base;
export {AUTH_TYPE};
