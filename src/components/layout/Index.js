import { Outlet } from 'react-router-dom'

import Header from './Header'
import SideNav from './SideNav'
import BottomNav from './BottomNav'

import { MegaphoneIcon, ClipboardDocumentIcon } from '@heroicons/react/24/solid'
import Base, { AUTH_TYPE } from '../Base'

const Layout = () => {
    const centerBaseClassNameIfNotAuth = 'min-h-screen';
    const centerBaseClassNameIfAuth = 'min-h-screen pt-20';

    const navMenu = [
        {
            to: '/roll-call/do',
            Icon: MegaphoneIcon,
            label: '点呼をする',
        },
        {
            to: '/roll-call/history',
            Icon: ClipboardDocumentIcon,
            label: '点呼履歴',
        },
    ];

    return (
        <div className="min-h-screen font-serif">
            <Base
                authType={AUTH_TYPE.AUTH}
                inner={<>
                    <Header />
                    <SideNav navMenu={navMenu} centerBaseClassName={centerBaseClassNameIfAuth} />
                    <BottomNav navMenu={navMenu} />
                    <Outlet context={{pageBaseClassName: `${centerBaseClassNameIfAuth} 2xl:ml-64`}} />
                </>}
            />
            <Base
                authType={AUTH_TYPE.NOT_AUTH}
                inner={<>
                    <Outlet context={{pageBaseClassName: `${centerBaseClassNameIfNotAuth}`}} />
                </>}
            />
            <Base
                authType={AUTH_TYPE.ANY}
                inner={<>
                    <Outlet context={{pageBaseClassName: `${centerBaseClassNameIfNotAuth}`}} />
                </>}
            />
        </div>
    );
}

export default Layout;
