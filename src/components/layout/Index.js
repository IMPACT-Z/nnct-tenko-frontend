import { Outlet } from 'react-router-dom'

import Header from './Header'
import SideNav from './SideNav'
import BottomNav from './BottomNav'

import { MegaphoneIcon, ClipboardDocumentIcon } from '@heroicons/react/24/solid'

const Layout = () => {
    const centerBaseClassName = 'min-h-screen pt-24';
    const pageBaseClassName = `${centerBaseClassName} xl:ml-64`

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
            <Header />
            <SideNav navMenu={navMenu} centerBaseClassName={centerBaseClassName} />
            <BottomNav navMenu={navMenu} />
            <Outlet context={{pageBaseClassName}} />
        </div>
    );
}

export default Layout;
