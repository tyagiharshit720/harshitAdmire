import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaClock, FaRupeeSign, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const PackageSlider = ({ 
  title, 
  description, 
  packages, 
  showDots = true, 
  autoSlide = true,
  slideInterval = 5000,
  customClass = ''
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === adjustedPackages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? adjustedPackages.length - 1 : prev - 1));
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!autoSlide) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, slideInterval);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const getPackagesPerSlide = () => {
    if (windowWidth < 768) return 1;
    if (windowWidth < 992) return 2;
    return 3;
  };

  const getAdjustedPackages = () => {
    const perSlide = getPackagesPerSlide();
    if (perSlide === 3) return packages;
    
    const allPackages = packages.flat();
    const newGroups = [];
    
    for (let i = 0; i < allPackages.length; i += perSlide) {
      newGroups.push(allPackages.slice(i, i + perSlide));
    }
    
    return newGroups;
  };

  const adjustedPackages = getAdjustedPackages();

  return (
    <div className={`bg-gray-50 font-['Poppins'] py-[60px] md:py-[60px] ${customClass}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10 md:mb-10">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 relative inline-block">
            {title}
            <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-red-400 to-red-300 rounded"></span>
          </h3>
          {description && (
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
        </div>

        <div className="relative overflow-hidden rounded-lg">
          <div 
            className="flex transition-transform duration-500 ease-custom" 
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {adjustedPackages.map((packageGroup, groupIndex) => (
              <div 
                key={groupIndex} 
                className="min-w-full flex justify-center md:justify-between flex-wrap px-2 box-border"
              >
                {packageGroup.map((pkg) => (
                  <div 
  key={pkg.id}
  className={`
    w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-20px)] 
    my-2 mx-2 md:mx-2 bg-white rounded-lg overflow-hidden 
    shadow-md transition-all duration-300
    ${isHovering === pkg.id ? 'transform -translate-y-2 shadow-xl' : ''}
    relative
  `}
  onMouseEnter={() => setIsHovering(pkg.id)}
  onMouseLeave={() => setIsHovering(null)}
>
  <Link to={pkg.link} className="no-underline text-inherit">
    <div className="h-48 md:h-52 overflow-hidden relative">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500"
        style={{ 
          backgroundImage: `url(${pkg.image})`,
          transform: isHovering === pkg.id ? 'scale(1.1)' : 'scale(1)'
        }}
      ></div>
      <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-xs flex items-center">
        <FaClock className="mr-1" />
        {pkg.duration}
      </div>
    </div>
    <div className="p-4 md:p-5">
      <h4 className="text-base md:text-lg font-semibold mb-2 text-gray-800 truncate">
        {pkg.title}
      </h4>
      <p className="text-sm md:text-base text-red-400 mb-2 flex items-center">
        <FaRupeeSign className="mr-1" />
        {pkg.price}
      </p>
      <p className="text-xs md:text-sm text-gray-600 mb-4 truncate">
        {pkg.location}
      </p>
      <div className="text-center">
        <button className={`
          bg-red-400 text-white border-none 
          px-4 py-2 md:px-5 md:py-2 rounded-full 
          cursor-pointer transition-all duration-300 
          font-medium text-sm md:text-sm
          ${isHovering === pkg.id ? 'transform scale-105 shadow-md shadow-red-400/40' : ''}
        `}>
          View More
        </button>
      </div>
    </div>
  </Link>
</div>
                ))}
              </div>
            ))}
          </div>

          {windowWidth >= 768 && (
            <>
              <button 
                onClick={prevSlide}
                className={`
                  absolute left-3 top-1/2 transform -translate-y-1/2 
                  bg-white bg-opacity-80 border-none w-10 h-10 rounded-full 
                  flex items-center justify-center cursor-pointer shadow-sm z-10 
                  transition-all duration-300 text-red-400
                  hover:bg-red-400 hover:bg-opacity-80 hover:text-white
                `}
              >
                <FaChevronLeft />
              </button>

              <button 
                onClick={nextSlide}
                className={`
                  absolute right-3 top-1/2 transform -translate-y-1/2 
                  bg-white bg-opacity-80 border-none w-10 h-10 rounded-full 
                  flex items-center justify-center cursor-pointer shadow-sm z-10 
                  transition-all duration-300 text-red-400
                  hover:bg-red-400 hover:bg-opacity-80 hover:text-white
                `}
              >
                <FaChevronRight />
              </button>
            </>
          )}
        </div>

        {showDots && (
          <div className="flex justify-center mt-8">
            {adjustedPackages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`
                  w-3 h-3 rounded-full border-none m-0 p-0 cursor-pointer 
                  transition-all duration-300 mx-1
                  ${currentSlide === index ? 'bg-red-400' : 'bg-gray-300'}
                `}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PackageSlider;