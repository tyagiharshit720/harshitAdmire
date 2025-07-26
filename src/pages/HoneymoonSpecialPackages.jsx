import React from 'react';
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';
import CallToAction from '../Components/learnmore/CallToAction';
import HeroSection from '../Components/HoneymoonSpecialPackages/HeroSection';
import SpecialHoneymoonDeals from '../Components/honeymoonSpecialPackages/SpecialHoneymoonDeals';
 
 
 
const HoneymoonSpecialPackages = () =>{
    return(
        <div>
            <NavBar />
            <HeroSection />
            <SpecialHoneymoonDeals />
            <CallToAction />
            <Footer />
        </div>
    )
}
 
export default HoneymoonSpecialPackages;