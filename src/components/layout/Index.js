import { Outlet } from 'react-router-dom'

import Header from './Header'
import SideNav from './SideNav'
import BottomNav from './BottomNav'

import { MegaphoneIcon, ClipboardDocumentIcon } from '@heroicons/react/24/solid'
import Base, { AUTH_TYPE } from '../Base'

const Layout = ({authType}) => {
    const centerBaseClassName = authType === AUTH_TYPE.NOT_AUTH ? 'min-h-screen' : 'min-h-screen pt-20';

    const navMenu = [
        {
            to: '/tenko/do',
            Icon: MegaphoneIcon,
            label: '点呼をする',
        },
        {
            to: '/tenko/history',
            Icon: ClipboardDocumentIcon,
            label: '点呼履歴',
        },
    ];

    return (
        <div className="min-h-screen font-serif">
            {authType === AUTH_TYPE.AUTH &&
                <Base
                    authType={authType}
                    inner={<>
                        <Header />
                        <SideNav navMenu={navMenu} centerBaseClassName={centerBaseClassName} />
                        <BottomNav navMenu={navMenu} />
                        <Outlet context={{pageBaseClassName: `${centerBaseClassName} xl:ml-72`}} />
                    </>}
                />
            }
            {authType !== AUTH_TYPE.AUTH &&
                <Base
                    authType={authType}
                    inner={<>
                        <Outlet context={{pageBaseClassName: `${centerBaseClassName}`}} />
                    </>}
                />
            }
        </div>
    );
}

export default Layout;
