import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const DomesticPackage = () => {
  const destinations = [
    {
      id: 1,
      name: "SOUTH-INDIA",
      slug: "south-india",
      image: "https://admiredashboard.theholistay.in/destination_images/1751095217_685f97b13c1b1LkcAU3dA.jpg"
    },
    {
      id: 2,
      name: "NAGPUR",
      slug: "nagpur",
      image: "https://plus.unsplash.com/premium_photo-1697730320983-f99aab252a44?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG5hZ3B1cnxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      id: 3,
      name: "PUNE",
      slug: "pune",
      image: "https://admiredashboard.theholistay.in/destination_images/1750531928_6856ff5867820R1IrN4dG.jpg"
    },
    {
      id: 4,
      name: "BANGALORE",
      slug: "banglore",
      image: "https://admiredashboard.theholistay.in/destination_images/1750531677_6856fe5d0cfdcAIvVFMxJ.jpg"
    },
    {
      id: 5,
      name: "AHMEDABAD",
      slug: "ahmedabad",
      image: "https://admiredashboard.theholistay.in/destination_images/1750531498_6856fdaac00a2X2PRnqwa.jpg"
    },
    {
      id: 6,
      name: "SIKKIM",
      slug: "sikkim",
      image: "https://admiredashboard.theholistay.in/destination_images/1745332441_6807a8d9c88449JatTSup.jpg"
    },
    // {
    //   id: 7,
    //   name: "Rajasthan",
    //   slug: "rajasthan",
    //   image: "https://admiredashboard.theholistay.in/destination_images/1745170357_68052fb5756b2YDpVGy3h.jpg"
    // },
    // {
    //   id: 8,
    //   name: "UTTARAKHAND",
    //   slug: "uttarakhand",
    //   image: "https://admiredashboard.theholistay.in/destination_images/1745003507_6802a3f32238e4FqQ3SSA.jpg"
    // },
    // {
    //   id: 9,
    //   name: "LEH-LADAKH",
    //   slug: "leh-ladakh",
    //   image: "https://admiredashboard.theholistay.in/destination_images/1745000682_680298eaeae6db9X0N3bk.webp"
    // },
    // {
    //   id: 10,
    //   name: "Kashmir",
    //   slug: "kashmir",
    //   image: "https://admiredashboard.theholistay.in/destination_images/1745000392_680297c828a24xTJgA47h.jpg"
    // },
    // {
    //   id: 11,
    //   name: "Andaman",
    //   slug: "andaman",
    //   image: "https://admiredashboard.theholistay.in/destination_images/1744988960_68026b2038ce1NkJDUysY.jpg"
    // },
    // {
    //   id: 12,
    //   name: "Kerala",
    //   slug: "kerala",
    //   image: "https://admiredashboard.theholistay.in/destination_images/1744986187_6802604b45a4a.jpg"
    // }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3
      }
    }
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/domestic");
  };

  return (
    <section className="relative py-20 bg-gradient-to-b from-white to-yellow-600 mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#261F43] mb-2">
            Explore Domestic Destinations
          </h1>
          <p className="text-lg text-red-600 max-w-2xl mx-auto">
            Budget packages in India
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {destinations.map((destination, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover="hover"
              className="group relative"
            >
              <Link 
                to={`/destinations/${destination.slug}`} 
                className="block h-full"
              >
                <div className="overflow-hidden rounded-lg shadow-lg bg-white h-full flex flex-col cursor-pointer">
                  <div className="relative h-64 overflow-hidden">
                    <motion.img
                      alt={destination.name}
                      src={destination.image}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-all duration-300 group-hover:bg-opacity-50">
                      <h3 className="text-white text-xl font-bold tracking-wide transition-transform duration-300 group-hover:scale-110">
                        {destination.name}
                      </h3>
                    </div>
                  </div>
                  <div className="p-4 text-center mt-auto">
                    <p className="text-gray-600">
                      Click to explore this amazing destination.
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <button
            onClick={handleClick}
            className="px-8 py-3 bg-[#E69233] hover:bg-[#d5822b] text-white font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
          >
            Explore More
          </button>
        </motion.div>
      </div>

      {/* Decorative animated elements */}
      <motion.div
        className="absolute top-20 left-10 w-8 h-8 rounded-full bg-yellow-400 opacity-30"
        animate={{
          y: [0, 20, 0],
          x: [0, 10, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-12 h-12 rounded-full bg-[#E69233] opacity-20"
        animate={{
          y: [0, -20, 0],
          x: [0, -10, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </section>
  );
};

export default DomesticPackage;