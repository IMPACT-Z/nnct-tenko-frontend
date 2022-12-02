import { Outlet } from 'react-router-dom'

import Header from './common/Header'
import Footer from './common/Footer'

const Layout = () => {

    return (
        <div className="min-h-screen font-serif">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}

export default Layout;
