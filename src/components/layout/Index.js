import { Outlet } from 'react-router-dom'

import Header from './Header'
import SideNav from './SideNav'
import BottomNav from './BottomNav'

import { MegaphoneIcon, ClipboardDocumentIcon, FaceSmileIcon } from '@heroicons/react/24/solid'
import Base, { AUTH_TYPE } from '../Base'

const Layout = ({authType}) => {
    const centerBaseClassName = authType === AUTH_TYPE.NOT_AUTH ? 'h-screen' : 'h-screen pt-20 md:pt-28';

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
        {
            to: '/tenko/register-face',
            Icon: FaceSmileIcon,
            label: '顔画像の登録',
        },
    ];

    return (
        <div className="h-screen font-serif">
            {authType === AUTH_TYPE.AUTH &&
                <Base
                    authType={authType}
                    innerHTML={<>
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
                    innerHTML={<>
                        <Outlet context={{pageBaseClassName: `${centerBaseClassName}`}} />
                    </>}
                />
            }
        </div>
    );
}

export default Layout;
