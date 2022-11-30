import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from './Layout';
import Home from './pages/Home';
import Test from './pages/Test';

import Login from './pages/user/Login';

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='' element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path='test' element={<Test />} />
                        <Route path='user'>
                            <Route path='login' element={<Login />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
