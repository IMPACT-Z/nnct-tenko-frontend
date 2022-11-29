import React from 'react';

import { HomeIcon, ArrowLeftOnRectangleIcon, MegaphoneIcon } from '@heroicons/react/24/solid'

const Header = () => {
    return (
        <header className="fixed w-screen top-0 left-0 divide-y divide-slate-300 border-b border-slate-300">
            <div className="row-span-1 h-16 px-14 grid grid-cols-2 bg-white">
                <h1 className="col-start-1 col-end-2 self-center text-slate-900 text-3xl tracking-wider">
                    NNCT 点呼
                </h1>
                <nav className="col-start-2 col-end-3 flex gap-x-5 justify-end text-slate-600 text-sm content-center items-center">
                    <a href="/" className="h-6 w-6 cursor-pointer hover:text-sky-400 text-lg">
                        <HomeIcon />
                    </a>
                    <form 
                        action="/" 
                        method="POST" 
                        className="h-6 w-6 cursor-pointer hover:text-sky-400 text-lg"
                    >
                        <button type="submit" className="h-full w-full">
                            <ArrowLeftOnRectangleIcon />
                        </button>
                    </form>
                </nav>
            </div>
            <div className="row-span-2 h-8 bg-slate-100">
                <nav className="function-menu-area h-full divide-x divide-slate-300 flex justify-center content-center items-center">
                    <div className="justify-center h-full relative group">
                        <div className="h-full w-48 text-slate-500 flex justify-center items-center gap-x-2 text-sm">
                            <MegaphoneIcon className="h-5 w-5" />
                            <div className="title tracking-widest">点呼</div>
                        </div>
                        <div 
                            className="absolute invisible group-hover:visible ring-1 ring-slate-300 flex flex-col items-center"
                        >
                            <a
                                className="w-48 h-8 bg-slate-100 text-slate-600 hover:text-sky-400 flex justify-center items-center text-sm"
                                href="/"
                            >点呼をする</a>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;
