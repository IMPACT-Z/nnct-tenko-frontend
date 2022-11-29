import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from './Layout';

import Home from './page/Home';
import Test from './page/Test';

import { HomeIcon, ArrowLeftOnRectangleIcon, MegaphoneIcon } from '@heroicons/react/24/solid'

const App = () => {
    const [data] = useState({
        header: {
            title: 'NNCT 点呼',
            shortcutMenu: [
                {
                    to: '/',
                    type: 'link',
                    Icon: HomeIcon,
                },
                {
                    to: 'logout',
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
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Layout data={data} />}>
                        <Route index element={<Home />} />
                        <Route path='test' element={<Test />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
