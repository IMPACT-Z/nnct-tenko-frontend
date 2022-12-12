import { getUserInfo, logout } from "../../functions/auth";

import { UserCircleIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid'
import { useState } from "react";


const Header = () => {
    const userInfo = getUserInfo();

    const [isDisplayUserPopup, setIsDisplayUserPopup] = useState(false);

    return (
        <header 
            className="fixed z-10 w-screen top-0 left-0 px-6 md:px-20 bg-white border-b-2 border-gray-200 grid grid-cols-2"
        >
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
            <nav className="col-start-2 col-end-3 flex gap-x-4 md:gap-x-7 justify-end text-sm content-center items-center">
                <div className="relative">
                    <button
                        className="rounded-full mt-2 md:mt-0 text-white bg-gray-500 text-lg cursor-pointer hover:opacity-70"
                        onClick={() => setIsDisplayUserPopup(!isDisplayUserPopup)}
                    >
                        <UserCircleIcon
                            className="h-8 w-8 md:h-10 md:w-10 rounded-full"
                        />
                    </button>
                    {isDisplayUserPopup &&
                        <>
                            <div 
                                className="absolute top-14 right-0 z-20 py-16 bg-white border border-gray-300 shadow-lg shadow-gray-300 hidden md:flex flex-col items-center justify-center gap-y-6"
                                style={{width: '512px', height: '272px'}}
                            >
                                <img
                                    src={userInfo.photoURL}
                                    alt='ユーザー画像'
                                    className="h-20 w-20 rounded-full"
                                />
                                <div className="flex flex-col gap-y-1">
                                    {[
                                        {name: 'email', label: 'メールアドレス'},
                                        {name: 'name', label: '名前'},
                                    ].map(item => 
                                        <div key={item.name} className="text-xl grid grid-cols-5 gap-x-6">
                                            <div className="text-gray-400 col-start-1 col-end-3">{item.label}</div>
                                            <div className="text-gray-600 col-start-3 col-end-6">{userInfo[item.name]}</div>
                                        </div>
                                    )}
                                    
                                </div>
                            </div>
                            <div 
                                className="absolute top-14 -right-14 z-20 py-6 bg-white border border-gray-300 shadow-lg shadow-gray-300 flex md:hidden flex-col items-center justify-center gap-y-3"
                                style={{width: '256px', height: '136px'}}
                            >
                                <img
                                    src={userInfo.photoURL}
                                    alt='ユーザー画像'
                                    className="h-10 w-10 rounded-full"
                                />
                                <div className="flex flex-col gap-y-1">
                                    {[
                                        {name: 'email', label: 'メールアドレス'},
                                        {name: 'name', label: '名前'},
                                    ].map(item => 
                                        <div key={item.name} className="text-xs grid grid-cols-5 gap-x-2">
                                            <div className="text-gray-400 col-start-1 col-end-3">{item.label}</div>
                                            <div className="text-gray-600 col-start-3 col-end-6">{userInfo[item.name]}</div>
                                        </div>
                                    )}
                                    
                                </div>
                            </div>
                        </>
                    }
                </div>

                <button
                    onClick={() => logout()}
                    className="p-1 rounded-full text-gray-50 bg-gray-500 text-lg cursor-pointer hover:opacity-70"
                >
                    <ArrowLeftOnRectangleIcon className="h-6 w-6 md:h-8 md:w-8" />
                </button>
            </nav>
        </header>
    );
}

export default Header;
