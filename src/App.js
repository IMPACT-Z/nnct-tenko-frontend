import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from './components/Layout';
import Login from './components/pages/auth/Login';
import RollCall from './components/pages/rollCall/Index'
import RollCallHistory from './components/pages/rollCall/HIstory'
import NotFound from './components/pages/NotFound';


const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='' element={<Layout />}>
                        <Route path='roll-call'>
                            <Route path='' element={<RollCall />} />
                            <Route path='history' element={<RollCallHistory />} />
                        </Route>
                        <Route path='auth'>
                            <Route path='login' element={<Login />} />
                        </Route>
                        
                        <Route path='' element={<NotFound to='/roll-call' />} />
                        <Route path='*' element={<NotFound to='/roll-call' />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
