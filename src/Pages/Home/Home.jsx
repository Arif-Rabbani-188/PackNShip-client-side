import React from 'react';
import Banner from '../../Components/Banner/Banner';
import Products from '../../Components/Products/Products';
import FAQ from '../FAQ/FAQ';
import Offers from '../Offers/Offers';

const Home = () => {
    return (
        <main>
            <Banner />
            <Products />
            <Offers />
            <FAQ />
        </main>
    );
};

export default Home;