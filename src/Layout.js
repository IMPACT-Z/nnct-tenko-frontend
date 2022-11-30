import { Outlet } from 'react-router-dom'

import Header from './components/common/Header'
import Footer from './components/common/Footer'

const Layout = () => {
    const baseClassName = 'min-h-screen pt-24 pb-8'

    return (
        <div className="min-h-screen font-serif">
            <Header />
            <Outlet context={{ baseClassName }} />
            <Footer />
        </div>
    );
}

export default Layout;
