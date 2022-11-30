import {useEffect} from 'react';
import Api from '../functions/api'

const Test = () => {
    useEffect(() => {
        Api.post('https://httpbin.org/post', {msg: 'hello'})
        .then(result => console.log(result))
        .catch(result => console.log(result));
    }, []);

    return (
        <div>test</div>
    );
}

export default Test;
