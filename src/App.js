import React, {useState} from 'react';

import Header from './components/Header'
import Footer from './components/Footer'
import Test from './page/Test';

import { HomeIcon, ArrowLeftOnRectangleIcon, MegaphoneIcon } from '@heroicons/react/24/solid'

const App = () => {
    const [context] = useState({
        header: {
            title: 'NNCT 点呼',
            shortcutMenu: [
                {
                    to: '/',
                    type: 'link',
                    Icon: HomeIcon,
                },
                {
                    to: '/',
                    type: 'button',
                    Icon: ArrowLeftOnRectangleIcon,
                }
            ],
            mainMenus: [
                {
                    title: '点呼',
                    Icon: MegaphoneIcon,
                    menu: [
                        {
                            to: '/',
                            label: '点呼をする',
                        }
                    ]
                }
            ]
        },
        footer: {
            copyright: {
                year: 2022,
                organization: '衝撃のイナズマZ'
            }
        }
    })

    return (
        <>
            <Header data={context.header} />
            <Test />
            <Footer data={context.footer} />
        </>
    );
}

export default App;
