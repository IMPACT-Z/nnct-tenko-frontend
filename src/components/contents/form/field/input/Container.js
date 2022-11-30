import React from 'react';
import { Link } from "react-router-dom";

import Input from './Index';

const InputContainer = ({data}) => {
    return (
        <div>
                {data.foreign &&
                    <div className="flex gap-x-3 items-center">
                        <Input data={data.input} width="366" />
                        <Link
                            className="bg-gray-100 ring-1 ring-slate-300 mx-1 px-2 py-1 text-slate-500 hover:text-slate-400"
                            to={data.foreign.add_form_url}
                        >
                            登録
                        </Link>
                    </div>
                }
                {data.foreign ||
                    <Input data={data.input} width="416" />
                }
        </div>
    )
}

export default InputContainer;
