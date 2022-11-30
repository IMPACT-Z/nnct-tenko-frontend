import React from 'react';
import { Link } from "react-router-dom";

import Input from './Index';

const InputContainer = ({context, register, isError}) => {
    return (
        <div>
                {context.foreign &&
                    <div className="flex gap-x-3 items-center">
                        <Input context={context} width="366" register={register} isError={isError} />
                        <Link
                            className="bg-gray-100 ring-1 ring-slate-300 mx-1 px-2 py-1 text-slate-500 hover:text-slate-400"
                            to={context.foreign.add_form_url}
                        >
                            登録
                        </Link>
                    </div>
                }
                {context.foreign ||
                    <Input context={context} width="416" register={register} isError={isError} />
                }
        </div>
    )
}

export default InputContainer;
