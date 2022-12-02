import { Outlet } from 'react-router-dom'

import Header from './components/common/Header'
import Footer from './components/common/Footer'

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
