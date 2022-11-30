import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from './Layout';
import Home from './pages/Home';
import Test from './pages/Test';

import data from './data'
import CreateUser from './pages/user/create';

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='' element={<Layout data={data} />}>
                        <Route index element={<Home />} />
                        <Route path='test' element={<Test />} />
                        <Route path='user'>
                            <Route path='create' element={<CreateUser />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
