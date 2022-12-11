import { NavLink } from "react-router-dom";


const BottomNav = ({navMenu}) => {
    return (
        <nav
            className={`bottom-nav fixed w-screen bottom-0 left-0 bg-gray-50 flex xl:hidden items-center justify-center gap-x-12`}
        >
            {navMenu.map(link => 
                <NavLink 
                    key={link.to}
                    to={link.to} 
                    className={
                        ({isActive}) => {
                            const classList = [
                                "cursor-pointer","flex flex-col items-center gap-y-2"
                            ];
                            if (isActive) classList.push('text-gray-500');
                            else classList.push('text-gray-400 opacity-90 hover:opacity-60')
                            return classList.join(' ');
                        }
                    }
                >
                    <link.Icon className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12" />
                    <div className="hidden md:block text-sm">{link.label}</div>
                </NavLink>
            )}
        </nav>
    );
}

export default BottomNav;
