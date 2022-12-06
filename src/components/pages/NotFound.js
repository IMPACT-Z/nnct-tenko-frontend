import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const NotFound = ({to}) => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate(to);
    }, []);
}

export default NotFound;
