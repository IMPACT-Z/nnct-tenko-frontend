import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AUTH_TYPE } from './components/Base'

import Layout from './components/layout/Index';
import Login from './components/pages/auth/Login';
import RollCall from './components/pages/tenko/Index'
import RollCallHistory from './components/pages/tenko/History'
import NotFound from './components/pages/NotFound';


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
                            <Route path='do' element={<RollCall />} />
                            <Route path='history' element={<RollCallHistory />} />
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
