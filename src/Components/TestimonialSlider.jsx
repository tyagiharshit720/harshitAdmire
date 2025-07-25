import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, MapPin, Calendar } from 'lucide-react';

const TestimonialSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "New York, USA",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b25482b6?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      destination: "Bali, Indonesia",
      date: "March 2024",
      comment: "This was absolutely the trip of a lifetime! The accommodations were luxurious, the local guides were incredibly knowledgeable, and every detail was perfectly planned. The rice terraces at sunrise were breathtaking, and the cultural experiences were authentic and memorable.",
      tripImage: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "Toronto, Canada",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      destination: "Santorini, Greece",
      date: "June 2024",
      comment: "From the moment we landed to our departure, everything was seamless. The sunset views from our villa were incredible, and the local food tours introduced us to flavors we'll never forget. The travel team went above and beyond to make our honeymoon perfect.",
      tripImage: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      location: "Madrid, Spain",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      destination: "Kyoto, Japan",
      date: "April 2024",
      comment: "The cherry blossom season in Kyoto was magical, and this travel company made it even more special. The traditional ryokan stay, the private tea ceremony, and the guided temple visits created memories that will last forever. Exceptional service throughout!",
      tripImage: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      name: "David Thompson",
      location: "London, UK",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      destination: "Patagonia, Chile",
      date: "February 2024",
      comment: "An adventure of a lifetime! The hiking trails were spectacular, and having expert guides made all the difference. The photography opportunities were endless, and the small group size made it feel personalized. Highly recommend for nature lovers!",
      tripImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      name: "Lisa Wang",
      location: "Sydney, Australia",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      destination: "Morocco",
      date: "January 2024",
      comment: "The markets of Marrakech, the Sahara desert experience, and the coastal beauty of Essaouira - this trip had everything! The cultural immersion was incredible, and our guide's stories brought every location to life. Absolutely unforgettable!",
      tripImage: "https://images.unsplash.com/photo-1489749798305-4fea3ae436d3?w=400&h=300&fit=crop"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">What Our Travelers Say</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover the experiences that make our journeys unforgettable through the words of our adventurous travelers
        </p>
      </div>

      <div 
        className="relative bg-white rounded-2xl shadow-2xl overflow-hidden"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <div className="grid md:grid-cols-2 gap-0 min-h-[500px]">
          {/* Image Section */}
          <div className="relative overflow-hidden">
            <img
              src={testimonials[currentSlide].tripImage}
              alt={testimonials[currentSlide].destination}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">{testimonials[currentSlide].destination}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{testimonials[currentSlide].date}</span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={testimonials[currentSlide].avatar}
                alt={testimonials[currentSlide].name}
                className="w-16 h-16 rounded-full object-cover border-4 border-blue-100"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {testimonials[currentSlide].name}
                </h3>
                <p className="text-gray-600 text-sm flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {testimonials[currentSlide].location}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 mb-6">
              {renderStars(testimonials[currentSlide].rating)}
              <span className="ml-2 text-sm text-gray-600">
                {testimonials[currentSlide].rating}/5
              </span>
            </div>

            <blockquote className="text-gray-700 text-lg leading-relaxed mb-8 italic">
              "{testimonials[currentSlide].comment}"
            </blockquote>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mb-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-blue-500 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 group"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700 group-hover:text-blue-600" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all duration-300 hover:scale-110 group"
        >
          <ChevronRight className="w-5 h-5 text-gray-700 group-hover:text-blue-600" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-1 mt-6">
        <div 
          className="bg-blue-500 h-1 rounded-full transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / testimonials.length) * 100}%` }}
        />
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="text-center p-6 bg-white rounded-xl shadow-lg">
          <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
          <div className="text-gray-600">Happy Travelers</div>
        </div>
        <div className="text-center p-6 bg-white rounded-xl shadow-lg">
          <div className="text-3xl font-bold text-blue-600 mb-2">4.9/5</div>
          <div className="text-gray-600">Average Rating</div>
        </div>
        <div className="text-center p-6 bg-white rounded-xl shadow-lg">
          <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
          <div className="text-gray-600">Destinations</div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;