import React from 'react';

import { XCircleIcon } from '@heroicons/react/24/solid'
import InputContainer from './input/Container';

const Field = ({data}) => {
    return (
        <div className="flex flex-col gap-y-1">
            {/* ラベル */}
            <div className="px-2 flex items-center content-center gap-x-2">
                <label htmlFor={data.name} className="text-slate-600">{data.label}</label>
                {data.required && 
                    <div className="text-sm text-red-500">※必須</div>
                }
            </div>

            {/* 入力欄 */}
            <InputContainer data={data} />
            
            {/* 簡易的な説明 */}
            {data.help_text &&
                <div className="px-6 text-slate-600 text-sm">
                    <div className="flex gap-x-1">
                        <div>※</div>
                        <div>{data.help_text}</div>
                    </div>
                </div>
            }

            {/* エラーメッセージ */}
            {data.errors &&
                <div className="px-6">
                    {data.errors.map(error => 
                        <div className="text-red-500 text-xs flex gap-x-1">
                            <div>
                                <XCircleIcon className="h-4 w-4" />
                            </div>
                            <div>{error}</div>
                        </div>
                    )}
                </div>
            }
        </div>
    )
}

export default Field;
