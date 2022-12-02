import { logout } from "../../functions/auth";

import Base, { AUTH_TYPE } from "../Base";

import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid'


const Header = () => {
    const title = 'NNCT点呼';
    const processMenu = [
        {
            authType: AUTH_TYPE.AUTH,
            Icon: ArrowLeftOnRectangleIcon,
            onClick: () => {
                logout();
            },
        }
    ];

    return (
        <header 
            className="fixed z-10 w-screen h-20 top-0 left-0 px-16 bg-white shadow-lg shadow-gray-200 grid grid-cols-2"
        >
            <h1 className="col-start-1 col-end-2 self-center text-gray-900 text-4xl tracking-widest">
                { title }
            </h1>
            <nav className="col-start-2 col-end-3 flex gap-x-8 justify-end text-gray-600 text-sm content-center items-center">
                {processMenu.map(item =>
                    <Base
                        key={item.Icon.render.name}
                        authType={item.authType}
                        inner = {
                            <button 
                                onClick={item.onClick}
                                className="p-2 rounded-full bg-sky-500 text-lg cursor-pointer hover:opacity-70"
                            >
                                <item.Icon className="h-7 w-7 text-gray-100" />
                            </button>
                        }
                    />
                )}
            </nav>
        </header>
    );
}

export default Header;
