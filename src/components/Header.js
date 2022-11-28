import React from 'react';

import { BeakerIcon } from '@heroicons/react/24/solid'

const Header = () => {
    return (
        <header className="fixed w-screen top-0 left-0 divide-y divide-slate-300 border-b border-slate-300">
            <div className="row-span-1 h-16 px-14 grid grid-cols-2 bg-white">
                <h1 className="col-start-1 col-end-2 self-center text-slate-900 text-2xl tracking-wide">
                    NNCT 点呼
                </h1>
                <nav className="col-start-2 col-end-3 flex gap-x-5 justify-end text-slate-600 text-sm content-center items-center">
                    <a href="/" className="h-4 cursor-pointer hover:text-teal-400 text-lg">
                        <BeakerIcon />
                    </a>
                    <form 
                        action="/" 
                        method="POST" 
                        className="h-4 cursor-pointer hover:text-teal-400 text-lg"
                    >
                        <button type="submit" className="h-full">
                            <BeakerIcon />
                        </button>
                    </form>
                </nav>
            </div>
            <div className="row-span-2 h-8 bg-slate-100">
                {/* {% include 'component/common/header/function_menu/main.html' with function_menu=header.function_menu %} */}
            </div>
        </header>
    );
}

export default Header;
