import React from 'react';

import { XCircleIcon } from '@heroicons/react/24/solid'
import InputContainer from './input/Container';

const Field = ({context, register, error}) => {
    return (
        <div className="flex flex-col gap-y-1">
            {/* ラベル */}
            <div className="px-2 flex items-center content-center gap-x-2">
                <label htmlFor={context.name} className="text-slate-600">{context.label}</label>
                {context.required && 
                    <div className="text-sm text-red-500">※必須</div>
                }
            </div>

            {/* 入力欄 */}
            <InputContainer context={context} register={register} error={error} />
            
            {/* 簡易的な説明 */}
            {context.helpText &&
                <div className="px-6 text-slate-600 text-sm">
                    <div className="flex gap-x-1">
                        <div>※</div>
                        <div>{context.helpText}</div>
                    </div>
                </div>
            }

            {/* エラーメッセージ */}
            {error &&
                <div className="px-6 text-red-500 text-xs flex gap-x-1">
                    <div>
                        <XCircleIcon className="h-4 w-4" />
                    </div>
                    <div>{error.message}</div>
                </div>
            }
        </div>
    )
}

export default Field;
