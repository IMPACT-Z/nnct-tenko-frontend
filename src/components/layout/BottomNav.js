import { NavLink } from "react-router-dom";


const BottomNav = ({navMenu}) => {
    return (
        <nav
            className={`fixed h-20 w-screen bottom-0 left-0 bg-gray-100 flex 2xl:hidden items-center justify-center gap-x-12`}
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
                            if (isActive) classList.push('text-sky-500');
                            else classList.push('text-gray-400 opacity-90 hover:opacity-60')
                            return classList.join(' ');
                        }
                    }
                >
                    <link.Icon className="h-10 w-10" />
                    <div className="text-sm">{link.label}</div>
                </NavLink>
            )}
        </nav>
    );
}

export default BottomNav;
