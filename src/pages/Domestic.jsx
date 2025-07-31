import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import SubscribeUs from "../forms/SubscribeUs";
import VideoTestimonials from "../Components/VideoTestimonials";
import TravelGallery from "../Components/TravelGallery";
import DestinationGrid from "../Components/destinations/DestinationGrid";
import { domesticDestinations } from "../data/destinations";
import HeroReusable from "../Components/heroSection/HeroReusable";
// import { getDestinationsData } from "../api/api";

const Domestic = () => {
  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchDomesticData = async () => {
      try {
        setLoading(true);
        const response = await getDestinationsData("domestic");
        
      console.log( response);
      console.log(response.data);
        
      } catch (error) {
        console.error("Error loading domestic data:", error);
        setDestinations(domesticDestinations);
      } finally {
        setLoading(false);
      }
    };

    fetchDomesticData();
  }, []);

  return (
    <div>
      <NavBar />
      <HeroReusable
        videoUrl={videoUrl}
        type="video/mp4"
        title="Discover Domestic Destinations"
      />

      <div className="py-12 bg-gray-50">
        {loading ? (
          <div className="text-center py-12">Loading destinations...</div>
        ) : (
          <DestinationGrid
            destinations={destinations}
            title="Popular Domestic Destinations"
            type="domestic"
          />
        )}
      </div>

      <TravelGallery />
      <VideoTestimonials />
      <SubscribeUs />
      <Footer />
    </div>
  );
};

export default Domestic;