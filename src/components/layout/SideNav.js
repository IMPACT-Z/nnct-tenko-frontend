import { NavLink } from "react-router-dom";


const SideNav = ({navMenu, centerBaseClassName}) => {
    return (
        <nav
            className={`fixed w-72 top-0 left-0 ${centerBaseClassName} bg-gray-100 px-12 pt-28 hidden xl:flex flex-col gap-y-8`}
        >
            {navMenu.map(link => 
                <NavLink 
                    key={link.to}
                    to={link.to} 
                    className={
                        ({isActive}) => {
                            const classList = [
                                "cursor-pointer","flex gap-x-2 tracking-widest"
                            ];
                            if (isActive) classList.push('text-sky-500 text-xl');
                            else classList.push('text-gray-400 text-lg opacity-90 hover:opacity-60')
                            return classList.join(' ');
                        }
                    }
                >
                    <link.Icon className="h-6 w-6" />
                    <div>{link.label}</div>
                </NavLink>
            )}
        </nav>
    );
}

export default SideNav;
