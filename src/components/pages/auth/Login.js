import { useState } from "react";

import { AUTH_TYPE } from "../../Base";
import PageBase from "../Base";
import { providers, login } from "../../../functions/auth";

import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/24/solid'

const Contents = () => {
    const socialServices = [
        {
            name: 'google',
            label: 'Google',
            provider: providers.google,
        }
    ];

    const slideImageNames = [
        'test1.png',
        'test2.png'
    ]
    const slideNum = slideImageNames.length;
    let [slideCount, setSlideCount] = useState(0);
    const incrementSlideCount = () => {
        slideCount = (slideCount + 1) % slideNum;
        setSlideCount(slideCount);
    }
    const decrementSlideCount = () => {
        slideCount = (slideCount + (slideNum - 1)) % slideNum;
        setSlideCount(slideCount);
    }

    return (<>
        <div className="2xl:col-start-1 2xl:col-end-4 px-24 py-12 bg-sky-500 flex gap-y-12 items-center justify-center gap-x-4">
            <button onClick={() => decrementSlideCount()}>
                <ArrowLeftCircleIcon className="w-12 h-12 text-white hover:opacity-80 cursor-pointer" />
            </button>
            <>
                <img 
                    src={`${process.env.PUBLIC_URL}/fig/slide/${slideImageNames[slideCount]}`}
                    alt="アプリケーションに関する説明"
                    className="block md:hidden shadow-xl shadow-gray-700"
                    style={{width: '480px', height: '270px'}}
                />
                <img 
                    src={`${process.env.PUBLIC_URL}/fig/slide/${slideImageNames[slideCount]}`}
                    alt="アプリケーションに関する説明"
                    className="hidden md:block lg:hidden shadow-xl shadow-gray-700"
                    style={{width: '640px', height: '360px'}}
                />
                <img 
                    src={`${process.env.PUBLIC_URL}/fig/slide/${slideImageNames[slideCount]}`}
                    alt="アプリケーションに関する説明"
                    className="hidden lg:block 3xl:hidden shadow-xl shadow-gray-700"
                    style={{width: '720px', height: '405px'}}
                />
            </>
            <button onClick={() => incrementSlideCount()}>
                <ArrowRightCircleIcon className="w-12 h-12 text-white hover:opacity-80 cursor-pointer" />
            </button>
        </div>
        <div className="2xl:col-start-4 2xl:col-end-6 py-16 2xl:py-24 bg-white flex flex-col items-center">
            <div className="w-96 bg-white flex flex-col gap-y-12">
                <div className="block text-gray-700 text-4xl text-center tracking-widest">NNCT点呼</div>
                <div className="flex flex-col gap-y-4">
                    <div className="px-4 text-gray-700 text-lg">外部アカウントでログイン</div>
                    <div className="flex 2xl:flex-col items-center gap-x-2 2xl:gap-x-0 gap-y-0 2xl:gap-y-4">
                        {socialServices.map(socialService => 
                            <button 
                                key={socialService.name}
                                onClick={() => login(socialService.provider)}
                                className="2xl:w-96 px-3 2xl:px-4 py-3 ring-1 ring-gray-300 rounded-full flex justify-center items-center 2xl:hover:opacity-60"
                            >
                                <img 
                                    src={`${process.env.PUBLIC_URL}/fig/socialServices/${socialService.name}.png`}
                                    alt={socialService.label}
                                    className="w-6 h-6 col-start-1 hover:opacity-60 2xl:hover:opacity-100"
                                />
                                <div className="hidden 2xl:block 2xl:w-full text-gray-700 text-lg tracking-wide">
                                    {socialService.label}でログイン
                                </div>
                                <div className="hidden 2xl:block 2xl:w-6"></div>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </>)
}

const Login = () => {
    return (
        <PageBase
            authType={AUTH_TYPE.NOT_AUTH}
            backgroundClassName=''
            inner={
                <>
                    <div 
                        className="hidden 2xl:grid min-h-screen grid-cols-5"
                    >
                        <Contents />
                    </div>

                    <div 
                        className="grid 2xl:hidden min-h-screen grid-rows-2"
                    >
                        <Contents />
                    </div>
                </>
            }
        />
    );
}

export default Login;
