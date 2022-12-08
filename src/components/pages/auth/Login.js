import React, { useCallback, useReducer } from "react";

import { AUTH_TYPE } from "../../Base";
import PageBase from "../Base";
import { providers, login } from "../../../functions/auth";

import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/24/solid'

const Slide = React.memo(() => {
    const getSlideImageNames = useCallback(() => {
        return [
            'test1.png',
            'test2.png'
        ];
    }, []);
    const [count, dispatch] = useReducer((state, action) => {
        const slideNum = getSlideImageNames().length;
        switch (action) {
            case 'increment':
                return (state + 1) % slideNum;
            case 'decrement':
                return (state + (slideNum - 1)) % slideNum;
            default:
                return state;
        }
    }, 0);
    const getSlideImageName = useCallback(() => {
        return getSlideImageNames()[count];
    }, [count, getSlideImageNames]);

    return (
        <div className="2xl:col-start-1 2xl:col-end-4 px-24 py-12 bg-gray-300 flex gap-y-12 items-center justify-center gap-x-4">
            <button onClick={() => dispatch('decrement')}>
                <ArrowLeftCircleIcon className="w-12 h-12 text-gray-600 hover:opacity-80 cursor-pointer" />
            </button>
            <>
                <img 
                    src={`${process.env.PUBLIC_URL}/fig/slide/${getSlideImageName()}`}
                    alt="アプリケーションに関する説明"
                    className="block md:hidden shadow-xl shadow-gray-700"
                    style={{width: '480px', height: '270px'}}
                />
                <img 
                    src={`${process.env.PUBLIC_URL}/fig/slide/${getSlideImageName()}`}
                    alt="アプリケーションに関する説明"
                    className="hidden md:block lg:hidden shadow-xl shadow-gray-700"
                    style={{width: '640px', height: '360px'}}
                />
                <img 
                    src={`${process.env.PUBLIC_URL}/fig/slide/${getSlideImageName()}`}
                    alt="アプリケーションに関する説明"
                    className="hidden lg:block 3xl:hidden shadow-xl shadow-gray-700"
                    style={{width: '720px', height: '405px'}}
                />
            </>
            <button onClick={() => dispatch('increment')}>
                <ArrowRightCircleIcon className="w-12 h-12 text-gray-600 hover:opacity-80 cursor-pointer" />
            </button>
        </div>
    );
});

const Contents = React.memo(() => {
    const socialServices = [
        {
            name: 'google',
            label: 'Google',
            provider: providers.google,
        }
    ];


    return (<>
        <Slide />
        <div className="2xl:col-start-4 2xl:col-end-6 py-16 2xl:py-24 bg-white flex flex-col items-center">
            <div className="w-96 bg-white flex flex-col gap-y-12">
                {/* <div className="block text-gray-700 text-4xl text-center tracking-widest">NNCT点呼</div> */}
                <div className="flex justify-center items-center">
                    <img
                        className=" w-28 h-28"
                        src={`${process.env.PUBLIC_URL}/logo.png`}
                        alt="ロゴ"
                    />
                </div>
                <div className="flex flex-col gap-y-4">
                    <div className="px-4 text-gray-700 text-lg">外部アカウントでログイン</div>
                    <div className="flex 2xl:flex-col items-center gap-x-2 2xl:gap-x-0 gap-y-0 2xl:gap-y-4">
                        {socialServices.map(socialService => 
                            <button 
                                key={socialService.name}
                                onClick={() => login(socialService.provider)}
                                className="w-96 px-4 py-3 ring-1 ring-gray-300 rounded-full flex justify-center items-center 2xl:hover:opacity-60"
                            >
                                <div className="block w-full text-gray-700 text-lg tracking-wide">
                                    {socialService.label}でログイン
                                </div>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </>)
});

const Login = React.memo(() => {
    return (
        <PageBase
            authType={AUTH_TYPE.NOT_AUTH}
            backgroundClassName=''
            innerHTML={
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
});

export default Login;
