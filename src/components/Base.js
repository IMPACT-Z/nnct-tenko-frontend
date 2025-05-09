import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import { onAuthStateChangedExcludingAuth } from '../functions/auth'


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

const Base = React.memo(({authType, innerHTML}) => {
    const navigate = useNavigate();
    const [isDisplay, setIsDisplay] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChangedExcludingAuth(user => {
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
                        navigate('/tenko/do');
                    }
                    break;
                case authType === AUTH_TYPE.ANY:
                    setIsDisplay(true);
                    break;
                default:
            }
        });
        return () => {
            unsubscribe();
        };
    }, [authType, navigate]);

    if (isDisplay)
        return innerHTML;
});

export default Base;
export {AUTH_TYPE};
