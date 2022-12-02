import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from './Layout';
import Login from './components/pages/auth/Login';
import Home from './components/pages/Index'


const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='' element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path='auth'>
                            <Route path='login' element={<Login />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
