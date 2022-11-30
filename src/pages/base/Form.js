import React from 'react';
import { useOutletContext } from 'react-router-dom'

import Form from '../../components/contents/Form';

const FormPage = () => {
    const { baseClassName } = useOutletContext();

    return (
        <main 
            className={`${baseClassName} bg-gradient-to-bl from-cyan-100 via-sky-100 to-blue-100`}
        >
            <div className="mx-auto my-20 flex justify-center items-center">
                <div
                    className="shadow-md shadow-slate-200 p-20 bg-white flex flex-col content-center"
                >
                    <Form />
                </div>
            </div>
        </main>
    );
}

export default FormPage;
