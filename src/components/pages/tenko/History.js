import React, { useEffect, useReducer, useState } from "react";
import { useLocation } from "react-router-dom";

import RestApi from '../../../functions/restApi';
import Calender from "../../../functions/calender";

import { AUTH_TYPE } from "../../Base";
import PageBase from "../Base";

import { ArrowLeftIcon, ArrowRightIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'


const DateCell = React.memo(({date, isOks, startTime}) => {
    const valueClassList = [];
    valueClassList.push(date.isToday ? 'bg-gray-200' : 'bg-white');
    if (date.isThisMonth) {
        valueClassList.push('text-gray-500');
    } else {
        valueClassList.push('text-gray-300');
    }


    const getIsOK = () => {
        if (!date.isThisMonth) return null;
        const now = new Date();
        const nowDate = new Date(now.getFullYear(),now.getMonth(),now.getDate()).getTime();
        const thisDate = new Date(date.year, date.month-1, date.value).getTime();
        if (thisDate > nowDate)  return null;
        if (thisDate === nowDate) {
            if (startTime === null)
                return null;
            if (now < new Date(now.getFullYear(),now.getMonth(),now.getDate(),startTime.hour,startTime.minute)) 
                return null;
        }
        
        return isOks?.find(item => 
            (item.year === date.year && item.month === date.month) && item.date === date.value
        ) ?? false;
    }

    const isOk = getIsOK();


    return (
        <td 
            className={`w-10 h-10 md:w-20 md:h-20 ring-1 ring-gray-300 text-2xl ${valueClassList.join(' ')} flex flex-col justify-center items-center gap-y-0 md:gap-y-1`}
        >
            <div
                className="text-sm md:text-xl"
            >
                {date.value}
            </div>
            {isOk !== null ?
                <div>
                    {isOk ? 
                        <CheckCircleIcon className={`w-4 h-4 md:w-7 md:h-7 text-lime-300`} />
                        :
                        <XCircleIcon className={`w-4 h-4 md:w-7 md:h-7 text-rose-300`} />
                    }
                </div>
                :
                <div className="w-4 h-4 md:w-7 md:h-7"></div>
            }
        </td>
    )
});

const TenkoHistory = React.memo(() => {
    const location = useLocation();

    const [startTime, setStartTime] = useState(null);
    useEffect(() => {
        const job = async () => {
            try {
                const response = await RestApi.get(
                    '/api/v1/tenko/duration',
                    '点呼の実施時間が取得できませんでした',
                )
                setStartTime(response.data.start);
            }
            catch(error) {}
        }
        job();
    }, []);

    const [calender, dispatchCalender] = useReducer((state, action) => {
        switch(action) {
            case 'init':
                const params = new URLSearchParams(location.search);
                const yearStr = params.get('year');
                let initYear = null;
                if (!Number.isInteger(yearStr)) 
                    initYear = Number(yearStr)
                
                const monthStr = params.get('month');
                let initMonth = null;
                if (!Number.isInteger(monthStr)) {
                    const tmp = Number(monthStr);
                    if (tmp >= 1 && tmp <= 12) initMonth = tmp;
                }

                if (initYear === null || initMonth === null) {
                    const now = new Date();
                    initYear = now.getFullYear();
                    initMonth = now.getMonth() + 1;
                }
            
                return new Calender(initYear, initMonth);
            
                case 'prev':
                    return state.getPrev();
                case 'next':
                    return state.getNext();
                case 'now':
                    const today = new Date();
                    return new Calender(today.getFullYear(), today.getMonth() + 1);

                default:
                    return state;
        }

    }, null);
    useEffect(() => {
        dispatchCalender('init');
    }, []);


    const [isOks, setIsOks] = useState(null);
    useEffect(() => {
        const job = async () => {
            try {
                const response = await RestApi.get(
                    '/api/v1/tenko/history',
                    '点呼の実施履歴が取得できませんでした', 
                    {
                        start: `${calender.year}-${calender.month}-${1}`,
                        end: `${calender.year}-${calender.month}-${calender.getLastDate()}`,
                    },
                );

                setIsOks(response.data.map(item => {
                    const issuedAt = new Date(Date.parse(item.issuedAt));
                    return {
                        year: issuedAt.getFullYear(),
                        month: issuedAt.getMonth() + 1,
                        date: issuedAt.getDate(),
                    }
                }));
            }
            catch(error) {}
        }
        job();
    }, [calender]);


    if (startTime === null) return;
    if (isOks === null) return;

    return (
        <PageBase
            authType={AUTH_TYPE.AUTH}
            backgroundClassName='bg-white'
            innerHTML={
                <div className="py-12 md:py-20 flex flex-col items-center gap-y-6 md:gap-y-8">
                    <div className="flex flex-col items-center gap-y-2 md:gap-y-4">
                        <div className="flex items-center gap-x-2 md:gap-x-6">
                            <button
                                onClick={() => dispatchCalender('prev')}
                            >
                                <ArrowLeftIcon className="w-4 h-4 md:w-6 md:h-6 text-gray-500 hover:text-gray-400" />
                            </button>
                            <div className="w-32 md:w-36 text-center text-gray-500 text-lg md:text-2xl">
                                {calender.year} 年 {calender.month} 月
                            </div>
                            <button
                                onClick={() => dispatchCalender('next')}
                            >
                                <ArrowRightIcon className="w-4 h-4 md:w-6 md:h-6 text-gray-500 hover:text-gray-400" />
                            </button>
                        </div>
                        <button
                            className="text-gray-500 text-sm md:text-lg border-b border-gray-500 hover:border-gray-400 hover:text-gray-400 tracking-widest"
                            onClick={() => dispatchCalender('now')}
                        >
                            今日
                        </button>
                    </div>
                    <table className="border-collapse flex flex-col items-center">
                        <thead>
                            <tr className="flex">
                                {Calender.weekDays.map(weekDay => 
                                    <th 
                                        key={weekDay} 
                                        className="w-10 h-5 md:w-20 md:h-10 text-xs md:text-lg bg-gray-500 ring-1 ring-gray-300 flex flex-col justify-center items-center"
                                    >
                                        <div className=" text-white">{weekDay}</div>
                                    </th>
                                    )}
                            </tr>
                        </thead>
                        <tbody>
                            {calender.get().map(week => 
                                <tr
                                    key={week.index}
                                    className="flex ring-1 ring-gray-300 justify-center items-center"
                                >
                                    {week.dates.map(date =>
                                        <DateCell 
                                            key={`${date.year}-${date.month}-${date.value}`} 
                                            date={date}
                                            isOks={isOks}
                                            startTime={startTime}
                                        />
                                    )}
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            }
        />
    );
});

export default TenkoHistory;
