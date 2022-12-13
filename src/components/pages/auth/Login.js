import React, { useCallback, useReducer } from "react";

import { AUTH_TYPE } from "../../Base";
import PageBase from "../Base";
import { providers, login } from "../../../functions/auth";

import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/24/solid'

const Slide = React.memo(() => {
    const getSlideImageNames = useCallback(() => {
        return [
            'tenko.png',
            'tenko_history.png'
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
        <div className="2xl:col-start-1 2xl:col-end-4 2xl:px-24 2xl:py-12 bg-gray-200 flex items-center justify-center gap-x-2 md:gap-x-3 xl:gap-x-4">
        <button onClick={() => dispatch('decrement')}>
            <ArrowLeftCircleIcon className="w-6 h-6 md:w-9 md:h-9 xl:w-12 xl:h-12 text-gray-500 hover:opacity-80 cursor-pointer" />
        </button>
            <div className="h-auto 2xl:w-auto 2xl:h-96 flex 2xl:flex-col items-center justify-center">
                <img 
                    src={`${process.env.PUBLIC_URL}/fig/slide/${getSlideImageName()}`}
                    alt="アプリケーションに関する説明"
                    className="w-72 md:w-auto md:h-80 2xl:h-auto 2xl:w-auto shadow-xl shadow-gray-700"
                />
            </div>
            <button onClick={() => dispatch('increment')}>
                <ArrowRightCircleIcon className="w-6 h-6 md:w-9 md:h-9 xl:w-12 xl:h-12 text-gray-500 hover:opacity-80 cursor-pointer" />
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
            <div className="bg-white flex flex-col gap-y-8 md:gap-y-12 items-center">
                <div className="col-start-1 col-end-2 flex items-center gap-x-3 md:gap-x-4">
                    <img
                        className="h-11 md:h-16"
                        src={`${process.env.PUBLIC_URL}/favicon.png`}
                        alt="アイコン"
                    />
                    <img
                        className="h-8 md:h-12"
                        src={`${process.env.PUBLIC_URL}/logo.png`}
                        alt="ロゴ"
                    />
                </div>
                <div className="flex flex-col gap-y-4 items-center">
                    <div className="px-4 text-gray-600 text-md md:text-lg">外部アカウントでログイン</div>
                    <div className="flex 2xl:flex-col items-center justify-center gap-x-2 2xl:gap-x-0 gap-y-0 2xl:gap-y-4">
                        {socialServices.map(socialService => 
                            <button 
                                key={socialService.name}
                                onClick={() => login(socialService.provider)}
                                className="w-48 md:w-96 px-4 py-2 md:py-3 ring-1 ring-gray-300 rounded-full flex justify-center items-center hover:opacity-60"
                            >
                                <div className="block w-full text-gray-600 text-sm md:text-lg tracking-wide">
                                    {socialService.label}でログイン
                                </div>
                            </button>
                        )}
                    </div>
                </div>
                <div className="px-4 md:pt-8 text-gray-600 text-sm md:text-lg flex flex-col gap-y-2">
                    <div className="px-2">※使用した音源</div>
                    <div className="flex gap-x-6">
                        <div>VOICEVOX:ずんだもん</div>
                        <a
                            className="underline hover:text-gray-400"
                            href="https://zunko.jp/"
                        >
                            https://zunko.jp/
                        </a>
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
                        className="hidden 2xl:grid h-screen grid-cols-5"
                    >
                        <Contents />
                    </div>

                    <div 
                        className="grid 2xl:hidden h-screen grid-rows-2"
                    >
                        <Contents />
                    </div>
                </>
            }
        />
    );
});

export default Login;
