import React from 'react';

import { XCircleIcon } from '@heroicons/react/24/solid'
import InputContainer from './input/Container';

const Field = ({context, register, error}) => {
    return (
        <div className="flex flex-col gap-y-1">
            {/* ラベル */}
            <div className="px-2 flex items-center content-center gap-x-2">
                <label htmlFor={context.name} className="text-lg text-slate-600">{context.label}</label>
                {context.required && 
                    <div className="text-sm text-red-500">※必須</div>
                }
            </div>

            {/* 入力欄 */}
            <InputContainer context={context} register={register} isError={error ? true : false} />
            
            {/* 簡易的な説明 */}
            {context.helpText &&
                <div className="px-7 text-sm text-slate-600">
                    <div className="flex gap-x-3">
                        <div>※</div>
                        <div>{context.helpText}</div>
                    </div>
                </div>
            }

            {/* エラーメッセージ */}
            {error &&
                <div className="px-6 text-sm text-red-500 flex gap-x-1">
                    <div>
                        <XCircleIcon className="h-5 w-5" />
                    </div>
                    <div>{error.message}</div>
                </div>
            }
        </div>
    )
}

export default Field;
