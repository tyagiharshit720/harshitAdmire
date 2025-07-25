import EnquiryForm from "../forms/EnquiryForm";
import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { getHeroSection } from "../api/api";

const AboutDetails = () => {
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);

  const navigate = useNavigate();

  const [videoUrl, setVideoUrl] = useState();
  const [loading, setLoading] = useState(true);
  console.log("video url-->", videoUrl);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);

        const { data } = await getHeroSection("about");
        console.log(data);

        setVideoUrl(data?.publicUrl[0]);
      } catch (error) {
        console.error("Error loading video:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, []);

  return (
    <div className="relative">
      {/* Hero Video Section */}
      <div className="relative w-full h-screen max-h-[80vh] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          {/* <source src="src/assets/videos/Hero-About.mp4" type="video/mp4" /> */}
          {videoUrl && <source src={videoUrl} type="video/mp4" />}
          Your browser does not support the video tag.
        </video>

        {/* Video overlay with text */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Discover the World with Admire Holidays
            </h1>
            <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto">
              Crafting unforgettable journeys for over a decade
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 space-y-28 text-gray-800">
        {/* Introduction Section */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-teal-700">
            Welcome to Admire Holidays!
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            Admire Holidays is more than just a tour and travel company; we are
            your gateway to unforgettable experiences and remarkable journeys.
            With a legacy spanning over 10 years, we have established ourselves
            as a trusted name in the travel and tourism industry, committed to
            delivering excellence at every step of your journey.
          </p>
        </div>

        {/* About Us Section with Video */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <video
            src="/about1.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto rounded-xl shadow-lg"
          />
          <div className="space-y-4">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-teal-700">About Us</h2>
              <p className="max-w-3xl mx-auto text-lg text-gray-600">
                With a legacy spanning over 10 years, Admire Holidays has become
                a trusted name in travel and tourism, committed to delivering
                excellence at every step.
              </p>
            </div>
            <h3 className="text-3xl font-semibold text-teal-700">Our Story</h3>
            <p className="text-lg text-gray-700">
              Our journey began with a simple yet profound mission: to help
              people explore the beauty of our world. Over the years, we have
              honed our expertise and expanded our services to cater to the
              diverse needs of travelers from all walks of life. Whether you
              seek adventure in the mountains, tranquility by the beach, or
              cultural immersion in vibrant cities, Admire Holidays is here to
              make your travel dreams a reality.
            </p>
          </div>
        </div>

        {/* What Sets Us Apart Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h3 className="text-3xl font-semibold text-teal-700">
              What Sets Us Apart
            </h3>
            <p className="text-lg text-gray-700">
              At Admire Holidays, we believe that travel is not just about
              reaching a destination; it's about the journey itself. That's why
              we go above and beyond to ensure that every aspect of your travel
              experience is seamless and unforgettable. From meticulously
              planned itineraries to personalized recommendations, our team of
              experienced professionals is dedicated to providing you with
              unparalleled service and support every step of the way.
            </p>
          </div>
          <img
            alt="Difference"
            loading="lazy"
            className="rounded-xl shadow-lg w-full h-auto"
            src="/about2.png"
          />
        </div>

        {/* Our Values Section */}
        <div className="text-center space-y-4">
          <h3 className="text-3xl font-semibold text-teal-700">Our Values</h3>
          <p className="max-w-3xl mx-auto text-lg text-gray-700">
            Integrity, transparency, and customer satisfaction are at the heart
            of everything we do. We pride ourselves on our commitment to ethical
            business practices and our unwavering dedication to exceeding our
            clients' expectations. Your trust is our most valuable asset, and we
            strive to earn it through our actions, integrity, and dedication to
            delivering exceptional travel experiences.
          </p>
        </div>

        {/* Why Choose Us Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h3 className="text-3xl font-semibold text-teal-700">
              Why Choose Admire Holidays
            </h3>
            <ul className="space-y-2 text-lg text-gray-700 list-disc list-inside">
              <li>
                <strong>Experience:</strong> With over 10 years of experience in
                the industry, we have the knowledge and expertise to create
                unforgettable travel experiences tailored to your unique
                preferences and interests.
              </li>
              <li>
                <strong>Personalized Service:</strong> We understand that no two
                travelers are alike, which is why we take the time to understand
                your needs and preferences to curate bespoke travel experiences
                that exceed your expectations.
              </li>
              <li>
                <strong>Transparency:</strong> We believe in transparency and
                honesty in all our dealings. From pricing and itinerary details
                to terms and conditions, you can trust us to provide clear and
                upfront information every step of the way.
              </li>
              <li>
                <strong>24/7 Support:</strong> Your safety and comfort are our
                top priorities. That's why our dedicated support team is
                available around the clock to assist you with any queries or
                concerns you may have before, during, or after your trip.
              </li>
            </ul>
          </div>
          <img
            alt="Why Choose Us"
            loading="lazy"
            className="rounded-xl shadow-lg w-full h-auto"
            src="/about3.png"
          />
        </div>

        {/* CTA Section */}
        <div className="bg-teal-700 text-white rounded-3xl p-12 text-center shadow-2xl">
          <h2 className="text-4xl font-bold mb-4">Join Us on the Journey</h2>
          <p className="text-lg mb-6 max-w-3xl mx-auto leading-relaxed">
            Whether you are embarking on a solo adventure, planning a romantic
            getaway, or organizing a group tour with friends and family, Admire
            Holidays is here to make your travel dreams come true. Join us on
            the journey of a lifetime and let us help you explore the wonders of
            our world, one unforgettable experience at a time.
          </p>
          <button
            onClick={() => setShowEnquiryForm(true)}
            className="bg-amber-400 text-teal-900 font-semibold px-8 py-3 rounded-full hover:bg-amber-300 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            Book Your Trip
          </button>
        </div>
      </section>

      {/* Enquiry Form Modal */}
      {showEnquiryForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowEnquiryForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
            <EnquiryForm onClose={() => setShowEnquiryForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutDetails;
