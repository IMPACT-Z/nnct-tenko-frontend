import { getUserInfo, logout } from "../../functions/auth";

import { UserCircleIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid'
import { useState } from "react";


const Header = () => {
    const userInfo = getUserInfo();

    const [isDisplayUserPopup, setIsDisplayUserPopup] = useState(false);

    return (
        <header 
            className="fixed z-10 w-screen h-28 top-0 left-0 px-20 bg-white shadow-lg shadow-gray-200 grid grid-cols-2"
        >
            <img
                className="col-start-1 col-end-2 w-28 h-28"
                src={`${process.env.PUBLIC_URL}/logo.png`}
                alt="ロゴ"
            />
            <nav className="col-start-2 col-end-3 flex gap-x-7 justify-end text-gray-600 text-sm content-center items-center">
                <div className="relative">
                    <button
                        className="rounded-full bg-gray-600 text-lg cursor-pointer hover:opacity-70"
                        onClick={() => setIsDisplayUserPopup(!isDisplayUserPopup)}
                    >
                        <UserCircleIcon
                            className="h-10 w-10 text-white rounded-full"
                        />
                    </button>
                    {isDisplayUserPopup &&
                        <div className="absolute top-14 right-0 z-20 w-72 p-8 bg-white border border-gray-300 shadow-lg shadow-gray-300 flex flex-col items-center gap-y-6">
                            <img
                                src={userInfo.photoURL}
                                alt='ユーザー画像'
                                className="h-20 w-20 rounded-full"
                            />
                            <div className="flex flex-col gap-y-1">
                                {[
                                    {name: 'studentId', label: '学籍番号'},
                                    {name: 'name', label: '名前'},
                                ].map(item => 
                                    <div key={item.name} className="text-lg grid grid-cols-5 gap-x-6">
                                        <div className="text-gray-500 col-start-1 col-end-3">{item.label}</div>
                                        <div className="text-gray-800 col-start-3 col-end-6">{userInfo[item.name]}</div>
                                    </div>
                                )}
                                
                            </div>
                        </div>
                    }
                </div>

                <button
                    onClick={() => logout()}
                    className="p-1 rounded-full bg-gray-600 text-lg cursor-pointer hover:opacity-70"
                >
                    <ArrowLeftOnRectangleIcon className="h-8 w-8 text-gray-100" />
                </button>
            </nav>
        </header>
    );
}

export default Header;
