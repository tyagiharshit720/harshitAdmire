import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { Link } from 'react-router-dom';

const TrendingDestinations = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const destinations = [
    // First row
    {
      id: 1,
      slug: "andaman", 
      name: "Andaman",
      description: "Pristine beaches & coral reefs",
      images: [
        "https://images.unsplash.com/photo-1589330694653-ded6df03f754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1590523278191-995cbcda646b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
        "https://images.unsplash.com/photo-1563906267088-b029e7101114?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      ],
    },
    {
      id: 2,
      slug: "vietnam", 
      name: "Vietnam",
      description: "Vibrant culture & landscapes",
      images: [
        "https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1526653057-f3f40ad7b724?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      ],
    },
    {
      id: 3,
      slug: "kashmir", 
      name: "Kashmir",
      description: "Paradise on earth",
      images: [
        "https://plus.unsplash.com/premium_photo-1697730277839-440df1a4415f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2FzaG1pcnxlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2FzaG1pcnxlbnwwfHwwfHx8MA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1697730150003-26a1d469adb4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8a2FzaG1pcnxlbnwwfHwwfHx8MA%3D%3D",
      ],
    },
    {
      id: 4,
      slug: "leh-ladakh", 
      name: "Leh-ladakh",
      description: "Majestic Himalayan beauty",
      images: [
        "https://images.unsplash.com/photo-1569670380685-4582bf29a24a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3JpJTIwbGFua2F8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1593118845043-359e5f628214?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bGFkYWtofGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1709874859086-b50e500f4136?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxhZGFraHxlbnwwfHwwfHx8MA%3D%3D",
      ],
    },
    // Second row
    {
      id: 5,
      slug: "sri-lanka", 
      name: "Sri Lanka",
      description: "Teardrop of the Indian Ocean",
      images: [
        "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1530&q=80",
        "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      ],
    },
    {
      id: 6,
      slug: "thailand", 
      name: "Thailand",
      description: "Land of smiles & temples",
      images: [
        "https://images.unsplash.com/photo-1528181304800-259b08848526?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1527&q=80",
        "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      ],
    },
    {
      id: 7,
      slug: "uttarakhand", 
      name: "Uttarakhand",
      description: "Devbhumi - Land of the Gods",
      images: [
        "https://plus.unsplash.com/premium_photo-1697730398251-40cd8dc57e0b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXR0cmFraGFuZHxlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1596599623428-87dbae5e7816?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXR0cmFraGFuZHxlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1724864814923-548d7fd5f42e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dXR0cmFraGFuZHxlbnwwfHwwfHx8MA%3D%3D",
      ],
    },
    {
      id: 8,
      slug: "sikkim", 
      name: "Sikkim",
      description: "Himalayan wonderland",
      images: [
        "https://images.unsplash.com/photo-1605540436563-5bca919ae766?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
        "https://images.unsplash.com/photo-1605540436563-5bca919ae766?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
        "https://images.unsplash.com/photo-1605540436563-5bca919ae766?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
      ],
    },
  ];

  return (
    <section className="py-20 px-5 text-center bg-gradient-to-b from-gray-50 to-white">
      <h2 
        className={`text-4xl md:text-5xl font-extrabold text-red-600 mb-16 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
        style={{ textShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
      >
        Trending Destinations
      </h2>
      
      {/* First row */}
      <div className="flex justify-center gap-6 max-w-7xl mx-auto mb-8 flex-wrap">
        {destinations.slice(0, 4).map((destination, index) => (
          <DestinationCard 
            key={destination.id}
            destination={destination}
            isVisible={isVisible}
            index={index}
          />
        ))}
      </div>
      
      {/* Second row */}
      <div className="flex justify-center gap-6 max-w-7xl mx-auto flex-wrap">
        {destinations.slice(4, 8).map((destination, index) => (
          <DestinationCard 
            key={destination.id}
            destination={destination}
            isVisible={isVisible}
            index={index + 4} // Offset index for staggered animation
          />
        ))}
      </div>
    </section>
  );
};

const DestinationCard = ({ destination, isVisible, index }) => {
  return (
    <div
      className={`w-72 rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] bg-white hover:-translate-y-2 hover:shadow-xl ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Link to={`/destinations/${destination.slug}`} className="no-underline text-inherit">
        <div className="h-80 relative overflow-hidden">
          <Swiper
            modules={[Autoplay, EffectFade]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            effect="fade"
            speed={1000}
            loop={true}
            className="w-full h-full"
          >
            {destination.images.map((image, imgIndex) => (
              <SwiperSlide key={imgIndex}>
                <img
                  src={image}
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-800 ease-in-out hover:scale-105"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent text-left text-white transition-all duration-300 ease-in-out group-hover:-translate-y-2">
            <h3 className="m-0 text-xl md:text-2xl font-bold mb-2">{destination.name}</h3>
            <p className="m-0 text-sm md:text-base opacity-90">{destination.description}</p>
          </div>
        </div>
        
        <div className="p-4 text-left bg-white">
          <div className="text-lg font-semibold text-gray-800 hover:text-red-600 transition-colors duration-200">
            {destination.name}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TrendingDestinations;