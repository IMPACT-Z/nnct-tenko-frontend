import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from './Layout';
import Home from './pages/Home'

import TestCreate from './pages/test/Create';

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='' element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path='test'>
                            <Route path='create' element={<TestCreate />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
