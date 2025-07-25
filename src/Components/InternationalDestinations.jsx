import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const InternationalDestinations = () => {
  const destinations = [
    {
      name: "Maldives",
      slug: "maldives",
      image: "https://admiredashboard.theholistay.in/destination_images/1750533766_68570686a9204oLjjZORL.jpg"
    },
    {
      name: "SINGAPORE",
      slug: "singapore",
      image: "https://admiredashboard.theholistay.in/destination_images/1750532967_685703672e9c9w0aeeaYR.jpg"
    },
    {
      name: "DUBAI",
      slug: "dubai",
      image: "https://admiredashboard.theholistay.in/destination_images/1750532692_68570254b7cf5sq9WV8yC.jpg"
    },
    {
      name: "MAURITIUS",
      slug: "mauritius",
      image: "https://admiredashboard.theholistay.in/destination_images/1750533673_68570629810e4CiDtIW8D.jpg"
    },
    {
      name: "EUROPE",
      slug: "europe",
      image: "https://admiredashboard.theholistay.in/destination_images/1750533500_6857057c33b37o0nRO3Zt.jpg"
    },
    {
      name: "China",
      slug: "china",
      image: "https://admiredashboard.theholistay.in/destination_images/1744959810_6801f9420424bSChJcMNn.webp"
    },
    {
      name: "THAILAND",
      slug: "thailand",
      image: "https://admiredashboard.theholistay.in/destination_images/1745002740_6802a0f4615e1lxl6tGLC.jpg"
    },
    {
      name: "SWITZERLAND",
      slug: "switzerland",
      image: "https://admiredashboard.theholistay.in/destination_images/1750533063_685703c78dac5OJKUiro1.jpg"
    },
    {
      name: "VIETNAM",
      slug: "vietnam",
      image: "https://admiredashboard.theholistay.in/destination_images/1744992883_68027a73ea810UwAxjYlT.jpg"
    }
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

   const navigate = useNavigate(); // Initialize navigate

  // Function to handle click
  const handleClick = () => {
    navigate("/international");
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
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-red-600 mb-2">
            Explore International Destinations
          </h1>
          <p className="text-lg text-red-600 max-w-2xl mx-auto">
            Affordable international tours
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
      className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
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
        className="absolute bottom-20 right-10 w-12 h-12 rounded-full bg-red-400 opacity-20"
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

export default InternationalDestinations;