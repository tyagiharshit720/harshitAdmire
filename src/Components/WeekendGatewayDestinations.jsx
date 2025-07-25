import React from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { FaPhone } from 'react-icons/fa';

const WeekendGatewayDestinations = () => {
  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: "free-snap",
    slides: {
      perView: "auto",
      spacing: 16,
    },
  });

  const destinations = [
    {
      id: 1,
      name: "SOUTH-INDIA",
      image: "https://admiredashboard.theholistay.in/destination_images/1751095217_685f97b13c1b1LkcAU3dA.jpg",
      count: 2
    },
    {
      id: 2,
      name: "HYDERABAD",
      image: "https://admiredashboard.theholistay.in/destination_images/1750532324_685700e41dc7cmovxnGBx.jpg",
      count: 0
    },
    {
      id: 3,
      name: "CHENNAI",
      image: "https://admiredashboard.theholistay.in/destination_images/1750532233_685700899f1615IWzIqxy.jpg",
      count: 0
    },
    {
      id: 4,
      name: "JAIPUR",
      image: "https://admiredashboard.theholistay.in/destination_images/1750532148_68570034adb29coTM79De.jpg",
      count: 0
    },
    {
      id: 5,
      name: "NAGPUR",
      image: "https://admiredashboard.theholistay.in/destination_images/1750532047_6856ffcf26b0bHOMWkHzQ.jpg",
      count: 0
    },
    {
      id: 6,
      name: "PUNE",
      image: "https://admiredashboard.theholistay.in/destination_images/1750531928_6856ff58674f1yeguC5SC.jpg",
      count: 0
    },
    {
      id: 7,
      name: "COCHIN",
      image: "https://admiredashboard.theholistay.in/destination_images/1750531818_6856feeae190bXbUMZLOh.jpg",
      count: 0
    },
    {
      id: 8,
      name: "BANGALORE",
      image: "https://admiredashboard.theholistay.in/destination_images/1750531677_6856fe5d0ce770HNEm99c.jpg",
      count: 0
    },
    {
      id: 9,
      name: "AHMEDABAD",
      image: "https://admiredashboard.theholistay.in/destination_images/1750531498_6856fdaabfc32bih0UXiU.jpg",
      count: 0
    },
    {
      id: 10,
      name: "DELHI",
      image: "https://admiredashboard.theholistay.in/destination_images/1750530399_6856f95f82dcdDCHLbw8P.jpg",
      count: 3
    },
    {
      id: 11,
      name: "SIKKIM",
      image: "https://admiredashboard.theholistay.in/destination_images/1745332441_6807a8d9c865fwHGclszn.jpg",
      count: 18
    },
    {
      id: 12,
      name: "MUMBAI",
      image: "https://admiredashboard.theholistay.in/destination_images/1745172765_6805391d81fc3xiEqnwSN.jpg",
      count: 3
    },
    {
      id: 13,
      name: "Rajasthan",
      image: "https://admiredashboard.theholistay.in/destination_images/1745170357_68052fb5757bep50lemi4.jpg",
      count: 1
    },
    {
      id: 14,
      name: "UTTARAKHAND",
      image: "https://admiredashboard.theholistay.in/destination_images/1745003507_6802a3f322524p1SFFB4g.jpg",
      count: 0
    },
    {
      id: 15,
      name: "LEH-LADAKH",
      image: "https://admiredashboard.theholistay.in/destination_images/1745000682_680298eaead09LQA7ReMF.jpg",
      count: 0
    },
    {
      id: 16,
      name: "Kashmir",
      image: "https://admiredashboard.theholistay.in/destination_images/1745000392_680297c82886dzY9Qlese.jpg",
      count: 18
    },
    {
      id: 17,
      name: "Andaman",
      image: "https://admiredashboard.theholistay.in/destination_images/1744988960_68026b2038edaQs8sS6bJ.jpg",
      count: 12
    },
    {
      id: 18,
      name: "Kerala",
      image: "https://admiredashboard.theholistay.in/destination_images/1744986187_6802604b45fa1.jfif",
      count: 14
    },
    {
      id: 19,
      name: "Haryana",
      image: "https://admiredashboard.theholistay.in/destination_images/1744954586_6801e4dae011a9KCKr0Hl.jpg",
      count: 0
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 mt-32">
      <h2 className="text-4xl font-bold text-center mb-6 text-[#261F43]">
        Weekend Gateway Destinations
      </h2>
      
      <div ref={sliderRef} className="keen-slider">
        {destinations.map((destination) => (
          <div key={destination.id} className="keen-slider__slide" style={{ minWidth: '405.333px', maxWidth: '405.333px' }}>
            <a href={`trending-destination/${destination.name.toUpperCase()}`}>
              <div className="bg-white rounded-xl shadow-md overflow-hidden p-4 h-[400px] flex flex-col justify-between hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="relative w-full h-48 rounded-md overflow-hidden">
                  <img
                    alt={destination.name}
                    loading="lazy"
                    className="object-cover w-full h-full"
                    src={destination.image}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-black bg-opacity-50 text-white text-lg font-bold px-3 py-1 rounded-full">
                      {destination.count}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <h3 className="font-bold text-lg text-[#261F43]">
                    {destination.name}
                  </h3>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-red-600 font-semibold text-2xl">
                    <FaPhone />
                  </div>
                  <button className="w-full text-white ml-3 px-4 py-2 text-sm rounded-md transition-colors bg-red-600 hover:bg-red-700">
                    Know More
                  </button>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekendGatewayDestinations;