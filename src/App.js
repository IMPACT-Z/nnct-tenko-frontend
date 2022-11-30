import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from './Layout';
import Home from './pages/Home';
import Test from './pages/Test';

import data from './data'

const App = () => {
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
