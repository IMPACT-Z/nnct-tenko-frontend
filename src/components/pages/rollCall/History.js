import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Calender from "../../../functions/calender";

import { AUTH_TYPE } from "../../Base";
import PageBase from "../Base";

import { ArrowLeftIcon, ArrowRightIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'


const DateCell = ({date, data, startTime}) => {
    const valueClassList = [];
    let okColor;
    let ngColor;

    valueClassList.push(date.isToday ? 'bg-sky-100' : 'bg-white');
    if (date.isThisMonth) {
        valueClassList.push('text-gray-500');
        okColor = 'text-sky-500';
        ngColor = 'text-gray-600';
    } else {
        valueClassList.push('text-gray-300');
        okColor = 'text-sky-300';
        ngColor = 'text-gray-400';
    }

    let isOk = undefined;
    const now = new Date();
    const nowDate = new Date(now.getFullYear(),now.getMonth(),now.getDate()).getTime();
    const thisDate = new Date(date.year, date.month-1, date.value).getTime();
    if (thisDate <= nowDate) {
        if (thisDate !== nowDate || now >= new Date(now.getFullYear(),now.getMonth(),now.getDate(),startTime.hour,startTime.minute)) {
            isOk = data.find(item =>
                (item.year === date.year && item.month === date.month) && item.date === date.value
            )?.value ?? false;
        }
    }

    return (
        <td 
            className={`w-24 h-24 ring-1 ring-gray-300 text-2xl ${valueClassList.join(' ')} flex flex-col justify-center items-center gap-y-1`}
        >
            <div>{date.value}</div>
            {isOk !== undefined ?
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
    const [data, setData] = useState([]);
    const [startTime, setStartTime] = useState();

    useEffect(() => {
        setData([
            {
                year: 2022,
                month: 11,
                date: 30,
                value: true,
            },
            {
                year: 2022,
                month: 12,
                date: 2,
                value: true,
            },
        ]);
        setStartTime({
            hour: 20,
            minute: 30,
        })
    }, []);

    // 表示する年, 月の設定
    const params = new URLSearchParams(useLocation().search);

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

    const [displayedYear, setDisplayedYear] = useState(initYear);
    const [displayedMonth, setDisplayedMonth] = useState(initMonth);

    const [calender, setCalender] = useState(
        new Calender(displayedYear, displayedMonth).get()
    );

    const setPrev = () => {
        const prev = new Calender(displayedYear, displayedMonth).getPrev();
        setDisplayedYear(prev.year);
        setDisplayedMonth(prev.month);
        setCalender(prev.get());
    }

    const setNow = () => {
        const today = new Date();
        const now = new Calender(today.getFullYear(), today.getMonth() + 1);
        setDisplayedYear(now.year);
        setDisplayedMonth(now.month);
        setCalender(now.get());
    }

    const setNext = () => {
        const next = new Calender(displayedYear, displayedMonth).getNext();
        setDisplayedYear(next.year);
        setDisplayedMonth(next.month);
        setCalender(next.get());
    }

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
                                <ArrowLeftIcon className="w-6 h-6 text-gray-500 hover:text-sky-400" />
                            </button>
                            <div className="w-36 text-center text-gray-500 text-2xl">
                                {displayedYear} 年 {displayedMonth} 月
                            </div>
                            <button
                                onClick={() => setNext()}
                            >
                                <ArrowRightIcon className="w-6 h-6 text-gray-500 hover:text-sky-400" />
                            </button>
                        </div>
                        <button
                            className="text-gray-500 text-lg border-b border-gray-400 hover:border-sky-300 hover:text-sky-300 tracking-widest"
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
                                        className="w-24 h-12 bg-sky-300 ring-1 ring-gray-300 flex flex-col justify-center items-center"
                                    >
                                        <div className=" text-white">{weekDay}</div>
                                    </th>
                                    )}
                            </tr>
                        </thead>
                        <tbody>
                            {calender.map(week => 
                                <tr
                                    key={week.index}
                                    className="flex ring-1 ring-gray-300 justify-center items-center"
                                >
                                    {week.dates.map(date =>
                                        <DateCell 
                                            key={`${date.year}-${date.month}-${date.value}`} 
                                            date={date}
                                            data={data}
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
