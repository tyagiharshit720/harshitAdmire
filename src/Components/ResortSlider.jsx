import React from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

const ResortsSlider = () => {
  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: "free-snap",
    slides: {
      perView: "auto",
      spacing: 24,
    },
    breakpoints: {
      '(max-width: 768px)': {
        slides: {
          perView: 1,
          spacing: 16,
        }
      }
    }
  });

  const resorts = [
    {
      id: 1,
      name: "Grand Tekkady",
      image: "https://admiredashboard.theholistay.in/resort_images/1745321532_68077e3c35d02OoezCjuR.jpg",
      discount: "5%",
      buttonColor: "rgb(230, 146, 51)"
    },
    {
      id: 2,
      name: "Taj Palace",
      image: "https://admiredashboard.theholistay.in/resort_images/1745321495_68077e177c6baMmbuz1mp.webp",
      discount: "5%",
      buttonColor: "rgb(230, 146, 51)"
    },
    {
      id: 3,
      name: "Mountain Retreat",
      image: "https://images.unsplash.com/photo-1684262206285-f853809d7473?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW91bnRhaW4lMjByZXNvcnR8ZW58MHx8MHx8fDA%3D",
      discount: "10%",
      buttonColor: "rgb(56, 182, 155)"
    },
    {
      id: 4,
      name: "Beach Paradise",
      image: "https://images.unsplash.com/photo-1483757164972-ca7f0837a227?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmVhY2glMjBwZXJhZGlzZXxlbnwwfHwwfHx8MA%3D%3D",
      discount: "15%",
      buttonColor: "rgb(66, 153, 225)"
    },
    {
      id: 5,
      name: "Luxury Valley",
      image: "https://images.unsplash.com/photo-1705690421635-f6227eafb670?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHZhbGxleSUyMGhvdGVsfGVufDB8fDB8fHww",
      discount: "8%",
      buttonColor: "rgb(159, 122, 234)"
    }
  ];

  return (
    <section className="mx-auto max-w-[1340px] mt-36 mb-36 px-4">
      <h2 className="text-center text-3xl font-bold mb-8 animate-fade-in">
        Explore Our Resorts
      </h2>
      
      <div className="relative lg:col-span-2 lg:mx-0">
        <div ref={sliderRef} className="keen-slider mt-8">
          {resorts.map((resort) => (
            <div 
              key={resort.id} 
              className="keen-slider__slide"
              style={{ minWidth: '428px', maxWidth: '428px' }}
            >
              <ResortCard resort={resort} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ResortCard = ({ resort }) => {
  return (
    <a 
      className="w-full block h-full group" 
      href={`resort-detail/${resort.id}`}
    >
      <div className="h-[420px] max-w-sm flex flex-col justify-between rounded-lg shadow-lg p-2 relative bg-white transition-all duration-300 hover:scale-[1.02] group-hover:shadow-xl">
        {/* Discount Badge with animation */}
        <div className="absolute top-2 left-2 bg-yellow-400 text-black font-bold px-3 py-1 rounded-md text-sm z-10 animate-bounce">
          Discount: {resort.discount}
        </div>
        
        {/* Image with zoom effect */}
        <div className="h-[200px] w-full relative rounded-lg overflow-hidden">
          <img
            alt={resort.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            src={resort.image}
          />
        </div>
        
        {/* Content */}
        <div className="p-4 flex flex-col justify-between flex-grow">
          <div>
            <h2 className="text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
              {resort.name}
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Discount: {resort.discount}
            </p>
          </div>
          
          {/* Animated button */}
          <button 
            className="w-full py-2 text-white rounded-lg mt-auto transition-all duration-300 hover:opacity-90 transform group-hover:-translate-y-1"
            style={{ backgroundColor: resort.buttonColor }}
          >
            <span className="flex items-center justify-center">
              Know More
              <svg 
                className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </a>
  );
};

export default ResortsSlider;