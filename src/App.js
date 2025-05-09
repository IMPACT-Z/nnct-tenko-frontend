import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AUTH_TYPE } from './components/Base'

import Layout from './components/layout/Index';
import Login from './components/pages/auth/Login';
import Tenko from './components/pages/tenko/Do'
import TenkoHistory from './components/pages/tenko/History'
import NotFound from './components/pages/NotFound';
import RegisterFace from './components/pages/tenko/RegisterFace';


const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='' element={<Layout authType={AUTH_TYPE.NOT_AUTH} />}>
                        <Route path='auth'>
                            <Route path='login' element={<Login />} />
                        </Route>
                        <Route path='' element={<NotFound to='/auth/login' />} />
                        <Route path='*' element={<NotFound to='/auth/login' />} />
                    </Route>
                    <Route path='' element={<Layout authType={AUTH_TYPE.AUTH} />}>
                        <Route path='tenko'>
                            <Route path='do' element={<Tenko />} />
                            <Route path='history' element={<TenkoHistory />} />
                            <Route path='register-face' element={<RegisterFace />} />
                        </Route>
                        <Route path='' element={<NotFound to='/tenko/do' />} />
                        <Route path='*' element={<NotFound to='/tenko/do' />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
