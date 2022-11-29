import { NavLink } from "react-router-dom";

const Header = (props) => {
    return (
        <header className="fixed w-screen top-0 left-0 divide-y divide-slate-300 border-b border-slate-300">
            <div className="row-span-1 h-16 px-14 grid grid-cols-2 bg-white">
                <h1 className="col-start-1 col-end-2 self-center text-slate-900 text-3xl tracking-wider">
                    { props.data.title }
                </h1>
                <nav className="col-start-2 col-end-3 flex gap-x-5 justify-end text-slate-600 text-sm content-center items-center">
                    {props.data.shortcutMenu.map(item => <div key={item.to}>
                        {item.type === 'link' && 
                            <NavLink to={item.to} className="cursor-pointer hover:text-sky-400 text-lg">
                                <item.Icon className="h-6 w-6" />
                            </NavLink>
                        }
                        {item.type === 'button' && 
                            <form 
                                action={item.to}
                                method="POST" 
                                className="h-6 w-6 cursor-pointer hover:text-sky-400 text-lg"
                            >
                                <button type="submit" className="h-full w-full">
                                    <item.Icon />
                                </button>
                            </form>
                        }
                    </div>)}
                </nav>
            </div>
            <div className="row-span-2 h-8 bg-slate-100">
                <nav className="function-menu-area h-full divide-x divide-slate-300 flex justify-center content-center items-center">
                    {props.data.mainMenus.map(menusItem =>
                        <div key={menusItem.title} className="justify-center h-full relative group">
                            <div className="h-full w-48 text-slate-500 flex justify-center items-center gap-x-2 text-sm">
                                <menusItem.Icon className="h-5 w-5" />
                                <div className="title tracking-widest">{ menusItem.title }</div>
                            </div>
                            <div 
                                className="absolute invisible group-hover:visible ring-1 ring-slate-300 flex flex-col items-center"
                            >
                                {menusItem.menu.map(menuItem =>
                                    <NavLink
                                        key={menuItem.to}
                                        to={ menuItem.to }
                                        className="w-48 h-8 bg-slate-100 text-slate-600 hover:text-sky-400 flex justify-center items-center text-sm"
                                    >
                                        { menuItem.label }
                                    </NavLink>
                                )}
                            </div>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Header;
