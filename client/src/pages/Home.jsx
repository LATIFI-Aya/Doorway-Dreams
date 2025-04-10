import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Feature from '../components/Feature'
import Linstings from '../components/Linstings'
import Footer from '../components/Footer'
import About from '../components/About'

 const Home = () => {
  return (
    <>
        <Header/>
        <Hero />
        <Feature />
        <Linstings />
        <About />
        {/*<Footer/>*/}
    </>
  );
};

export default Home;