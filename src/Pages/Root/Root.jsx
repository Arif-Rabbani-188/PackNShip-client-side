import React, { useContext } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footerer/Footer';
import FullScreenLoader from '../../Components/Loader/FullScreenLoader';
import { Authconext } from '../../Context/AuthContext/AuthContext';

const Root = () => {
    const { loading } = useContext(Authconext);
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-1 w-full">
                {loading ? <FullScreenLoader /> : <Outlet />}
            </div>
            <Footer />
        </div>
    );
};

export default Root;