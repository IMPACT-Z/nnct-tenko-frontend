import { Outlet } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'

const Layout = (props) => {
    return (
        <>
            <Header data={props.data.header} />
            <Outlet />
            <Footer data={props.data.footer} />
        </>
    );
}

export default Layout;
