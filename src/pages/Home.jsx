import React from "react";
import NavBar from "../Components/NavBar";
import ScrollToTop from "../Components/ScrollToTop";
import Hero from "../Components/heroSection/Hero";
import TrendingDestinations from "../Components/TrendingDestinations";
import PackageSlider from "../Components/PackageSlider";
import InternationalDestinations from "../Components/InternationalDestinations";
import DomesticPackage from "../Components/DomesticPackage";
import Footer from "../Components/Footer";

import {
  recommendedPackages,
  weekendPackages,
  internationalPackages,
  domesticPackages,
} from "../data/packages";
import WeekendGatewayDestinations from "../Components/WeekendGatewayDestinations";
import ResortsSlider from "../Components/ResortSlider";
import TravelTips from "../Components/TravelTips";
import WhyBookAdmireHolidays from "../Components/WhyBookAdmireHolidays";
import TravelGallery from "../Components/TravelGallery";
import VideoTestimonials from "../Components/VideoTestimonials";
import SubscribeUs from "../forms/SubscribeUs";
import StatsAndPartners from "../Components/StatsAndPartners";
import { Link } from "react-router-dom";
import EnquiryForm from "../forms/EnquiryForm";
import TestimonialSlider from "../Components/TestimonialSlider";
import ChatWidget from "../Components/ChatBot/ChatWidget";




const Home = () => {
  return (
    <div className="home-page">
      
      
      {/* <ScrollToTop /> */}
      <EnquiryForm/>


      <NavBar />
      <Hero
        videoSrc="src/assets/videos/Hero-video.mp4"
        title="Discover Domestic Destinations"
      />


      <PackageSlider
        title="Recommended Tour Packages"
        description="Curated packages designed to suit every traveler's needs"
        packages={recommendedPackages}
      />
      <TrendingDestinations />


      <PackageSlider
        title="Weekend Trending Packages"
        description="Perfect quick escapes for your busy schedule"
        packages={weekendPackages}
        customClass="bg-blue-50"
      />

      <InternationalDestinations />

      <PackageSlider
        title="International Holiday Packages"
        description="Explore the world with our exclusive deals"
        packages={internationalPackages}
      />

      <DomesticPackage />

      {/* Alternative if you want to use PackageSlider for domestic packages */}
      {/* <PackageSlider 
        title="Domestic Holiday Packages"
        description="Discover India's hidden gems"
        packages={domesticPackages}
        customClass="bg-green-50"
      /> */}

      <WeekendGatewayDestinations />
      <ResortsSlider />
      <TravelTips />

      <WhyBookAdmireHolidays />

      <TravelGallery />
      <VideoTestimonials />
      <TestimonialSlider/>
      <StatsAndPartners />
    
      <SubscribeUs />
      <Footer />

      {/* Sticky small form button */}
      <Link
        to="/HomeStickyFormPage"
        className="
          fixed
          right-0
          top-1/2
          -translate-y-1/2
          bg-red-500
          text-white
          px-1.5
          py-2.5
          rounded-tl-md
          rounded-bl-md
          font-semibold
          cursor-pointer
          z-[1000]
          no-underline
          shadow-md
          text-[14px]
          w-10
          text-center
          [writing-mode:vertical-lr]
          [text-orientation:mixed]
        "
      >
        Suggestions/Complaints
      </Link>

      <ChatWidget />
    </div>
  );
};

export default Home;
