import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, Grid } from "lucide-react";
import { travelGallery } from "../api/api.js";

const importAllImages = () => {
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return shuffleArray(imageArray);
};

const TravelGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAllPopup, setShowAllPopup] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);
  // console.log("images-->", images);

  // useEffect(() => {
  //   const fetchImages = async () => {
  //     try {
  //       const response = await travelGallery();
  //       // console.log(response)
  //       setImages(response?.data?.customerGalleryData[0].image);
  //       console.log(response.data.customerGalleryData[0].image)
  //       console.log(`Imgae => ${images}`)
  //     } catch (error) {
  //       console.error("Failed to fetch travel gallery:", error);
  //     }
  //   };

  //   fetchImages();
  // }, []);
  useEffect(() => {
  const fetchImages = async () => {
    try {
      const response = await travelGallery();

      console.log("✅ Full API Response:", response);

      const galleryData = response?.data?.customerGalleryData;

      if (Array.isArray(galleryData) && galleryData.length > 0) {
        console.log("✅ First Image:", galleryData[0].image);
        setImages(galleryData[0].image);
      } else {
        console.warn("⚠️ customerGalleryData is empty or not an array");
      }

    } catch (error) {
      console.error("❌ Failed to fetch travel gallery:", error);
    }
  };

  fetchImages();
}, []);


  const openImageModal = (image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const closeAllPopup = () => {
    setShowAllPopup(false);
  };

  const navigateImage = (direction) => {
    const newIndex =
      direction === "next"
        ? (currentImageIndex + 1) % images.length
        : (currentImageIndex - 1 + images.length) % images.length;

    setCurrentImageIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      if (showAllPopup) closeAllPopup();
      else if (selectedImage) closeImageModal();
    }
    if (e.key === "ArrowLeft") navigateImage("prev");
    if (e.key === "ArrowRight") navigateImage("next");
  };

  React.useEffect(() => {
    if (selectedImage || showAllPopup) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedImage, currentImageIndex, showAllPopup]);

  if (images?.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading images...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Your Trusted Partner
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in-delay">
            in travel and tour experiences
          </p>
          <div className="w-24 h-1 bg-white/50 mx-auto rounded-full animate-pulse"></div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute bottom-10 right-10 w-16 h-16 bg-white/10 rounded-full animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-float"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primaryHeading mb-4">
            Discover Unforgettable Moments
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We have created countless memories for our travelers. Explore the
            beautiful destinations and experiences that await you.
          </p>
        </div>

        {/* Gallery Grid - only 8 cards from mainGalleryImages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {images?.slice(0, 8).map((image, index) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
              onClick={() => openImageModal(image, index + 45)} // index offset for modal
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: "slideUp 0.6s ease-out forwards",
              }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={image.url}
                  alt="image"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Show All Button */}
        <div className="text-center">
          <button
            onClick={() => setShowAllPopup(true)}
            className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            <span className="relative z-10 flex items-center">
              <Grid className="w-5 h-5 mr-2" />
              See All Images
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </button>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 animate-fade-in"
          aria-modal="true"
          role="dialog"
          aria-label="Image modal"
        >
          {/* Close Button OUTSIDE the image container */}
          <button
            onClick={closeImageModal}
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-[10000] bg-black/50 rounded-full p-2 hover:bg-black/70"
            aria-label="Close image modal"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Navigation Buttons OUTSIDE the image container */}
          <button
            onClick={() => navigateImage("prev")}
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-[10000] bg-black/50 rounded-full p-3 hover:bg-black/70"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
          <button
            onClick={() => navigateImage("next")}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-[10000] bg-black/50 rounded-full p-3 hover:bg-black/70"
            aria-label="Next image"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          {/* Image Container */}
          <div className="relative max-w-6xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl">
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="w-full h-auto max-h-[90vh] object-contain"
            />
            <div className="absolute bottom-6 left-6 right-6 bg-black/50 backdrop-blur-md rounded-2xl p-4 text-white">
              <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
              <p className="text-lg">{selectedImage.experience}</p>
            </div>
          </div>
        </div>
      )}

      {/* Show All Popup */}
      {showAllPopup && (
        <div
          onClick={closeAllPopup}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998] flex items-start justify-center p-6 overflow-auto"
          style={{ paddingTop: "5rem" }} // padding from top so close button visible
          aria-modal="true"
          role="dialog"
          aria-label="Show all images popup"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-7xl w-full bg-white rounded-3xl shadow-xl p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {/* Close Button OUTSIDE cards container */}
            <button
              onClick={closeAllPopup}
              className="fixed top-6 right-6 text-gray-600 hover:text-gray-900 transition-colors rounded-full p-2 bg-gray-200 hover:bg-gray-300 z-[10000]"
              aria-label="Close all images popup"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Back Button on top-left OUTSIDE */}
            <button
              onClick={closeAllPopup}
              className="fixed top-6 left-6 flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors rounded-full p-2 z-[10000]"
            >
              <ChevronLeft className="w-6 h-6" />
              <span className="font-semibold">Back</span>
            </button>

            {images.map((image, index) => (
              <div
                key={image.id}
                className="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer"
                onClick={() => openImageModal(image, index)}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-48 object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Animations */}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease forwards;
        }
        .animate-fade-in-delay {
          animation: fadeIn 1s ease forwards;
          animation-delay: 0.5s;
        }
        @keyframes fadeIn {
          from {opacity: 0;}
          to {opacity: 1;}
        }
        .animate-pulse {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% {opacity: 1;}
          50% {opacity: 0.6;}
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 5s ease-in-out infinite;
          animation-delay: 2.5s;
        }
        @keyframes float {
          0%, 100% {transform: translateY(0);}
          50% {transform: translateY(-20px);}
        }
      `}</style>
    </div>
  );
};

export default TravelGallery;
