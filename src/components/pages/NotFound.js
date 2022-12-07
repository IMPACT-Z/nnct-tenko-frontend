import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const NotFound = React.memo(({to}) => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate(to);
    }, []);
});

export default NotFound;
