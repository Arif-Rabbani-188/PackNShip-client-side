import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Banner from '../../Components/Banner/Banner';
import Products from '../../Components/Produucts/Products';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Products></Products>
        </div>
    );
};

export default Home;