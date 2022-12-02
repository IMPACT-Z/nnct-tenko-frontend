import { NavLink } from "react-router-dom";
import { logout } from "../../functions/auth";

import Base, { AUTH_TYPE } from "../Base";

import { HomeIcon, ArrowRightOnRectangleIcon, MegaphoneIcon } from '@heroicons/react/24/solid'


const Header = () => {
    const title = 'NNCT点呼';
    const shortcutMenu = [
        {
            type: 'link',
            authType: AUTH_TYPE.AUTH,
            Icon: HomeIcon,
            to: '/',
        },
        {
            type: 'process',
            authType: AUTH_TYPE.AUTH,
            Icon: ArrowRightOnRectangleIcon,
            onClick: () => {
                logout();
            },
        }
    ];

    return (
        <header className="fixed w-screen top-0 left-0 divide-y divide-slate-300 border-b border-slate-300">
            <div className="row-span-1 h-16 px-14 grid grid-cols-2 bg-white">
                <h1 className="col-start-1 col-end-2 self-center text-slate-900 text-3xl tracking-wider">
                    { title }
                </h1>
                <nav className="col-start-2 col-end-3 flex gap-x-5 justify-end text-slate-600 text-sm content-center items-center">
                    {shortcutMenu.map(item =>
                        <Base
                            key={item.Icon.render.name}
                            authType={item.authType}
                            inner = {<>
                                {item.type === 'link' && 
                                    <NavLink to={item.to} className="cursor-pointer hover:text-sky-400 text-lg">
                                        <item.Icon className="h-6 w-6" />
                                    </NavLink>
                                }
                                {item.type === 'process' && 
                                    <button 
                                        onClick={item.onClick}
                                        className="h-6 w-6 cursor-pointer hover:text-sky-400 text-lg"
                                    >
                                        <item.Icon className="h-6 w-6" />
                                    </button>
                                }
                            </>}
                        />
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Header;
