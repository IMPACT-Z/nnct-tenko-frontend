import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import RestApi from '../../../functions/restApi';
import Calender from "../../../functions/calender";

import { AUTH_TYPE } from "../../Base";
import PageBase from "../Base";

import { ArrowLeftIcon, ArrowRightIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'


const DateCell = ({date, isOks, startTime}) => {
    const valueClassList = [];
    let okColor;
    let ngColor;

    valueClassList.push(date.isToday ? 'bg-sky-200' : 'bg-white');
    if (date.isThisMonth) {
        valueClassList.push('text-gray-600');
        okColor = 'text-sky-500';
        ngColor = 'text-gray-600';
    } else {
        valueClassList.push('text-gray-300');
        okColor = 'text-sky-300';
        ngColor = 'text-gray-400';
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
            className={`w-24 h-24 ring-1 ring-gray-300 text-2xl ${valueClassList.join(' ')} flex flex-col justify-center items-center gap-y-1`}
        >
            <div>{date.value}</div>
            {isOk !== null ?
                <div>
                    {isOk ? 
                        <CheckCircleIcon className={`w-7 h-7 ${okColor}`} />
                        :
                        <XCircleIcon className={`w-7 h-7 ${ngColor}`} />
                    }
                </div>
                :
                <div className="w-8 h-8"></div>
            }
        </td>
    )
}

const RollCallHistory = () => {
    const [startTime, setStartTime] = useState(null);
    useEffect(() => {
        new RestApi('/api/v1/tenko/duration')
        .get('点呼の実施時間が取得できませんでした')
        .then((response) => {
            setStartTime(response.data.start);
        });
    }, []);


    const params = new URLSearchParams(useLocation().search);

    // 表示する年, 月の設定
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

    const [calender, setCalender] = useState(
        new Calender(initYear, initMonth)
    )


    const [isOks, setIsOks] = useState(null);
    useEffect(() => {
        new RestApi('/api/v1/tenko/history')
        .get(
            '点呼の実施履歴が取得できませんでした', 
            {
                start: `${calender.year}-${calender.month}-${1}`,
                end: `${calender.year}-${calender.month}-${calender.getLastDate()}`,
            },
        )
        .then((response) => {
            setIsOks(response.data.map(item => {
                const issuedAt = new Date(Date.parse(item.issuedAt));
                return {
                    year: issuedAt.getFullYear(),
                    month: issuedAt.getMonth() + 1,
                    date: issuedAt.getDate(),
                }
            }));
        })
    }, [calender]);

    
    const setPrev = () => {
        setCalender(calender.getPrev());
    }

    const setNow = () => {
        const today = new Date();
        setCalender(new Calender(today.getFullYear(), today.getMonth() + 1));
    }

    const setNext = () => {
        setCalender(calender.getNext());
    }

    if (startTime === null) return;
    if (isOks === null) return;

    return (
        <PageBase
            authType={AUTH_TYPE.AUTH}
            backgroundClassName='bg-white'
            inner={
                <div className="py-20 flex flex-col items-center gap-y-8">
                    <div className="flex flex-col items-center gap-y-4">
                        <div className="flex items-center gap-x-6">
                            <button
                                onClick={() => setPrev()}
                            >
                                <ArrowLeftIcon className="w-6 h-6 text-gray-700 hover:text-sky-400" />
                            </button>
                            <div className="w-36 text-center text-gray-700 text-2xl">
                                {calender.year} 年 {calender.month} 月
                            </div>
                            <button
                                onClick={() => setNext()}
                            >
                                <ArrowRightIcon className="w-6 h-6 text-gray-700 hover:text-sky-400" />
                            </button>
                        </div>
                        <button
                            className="text-gray-500 text-lg border-b border-gray-600 hover:border-sky-300 hover:text-sky-300 tracking-widest"
                            onClick={() => setNow()}
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
                                        className="w-24 h-12 bg-sky-500 ring-1 ring-gray-300 flex flex-col justify-center items-center"
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
}

export default RollCallHistory;
