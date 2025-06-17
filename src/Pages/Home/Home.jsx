import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Banner from '../../Components/Banner/Banner';
import Products from '../../Components/Produucts/Products';
import FAQ from '../FAQ/FAQ';
import Offers from '../Offers/Offers';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Products></Products>
            <Offers></Offers>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;