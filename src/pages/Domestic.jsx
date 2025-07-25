import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getHeroSection } from "../api/api";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import SubscribeUs from "../forms/SubscribeUs";
import VideoTestimonials from "../Components/VideoTestimonials";
import TravelGallery from "../Components/TravelGallery";
import DestinationGrid from "../Components/destinations/DestinationGrid";
import { domesticDestinations } from "../data/destinations";
import HeroReusable from "../Components/heroSection/HeroReusable";

const Domestic = () => {
  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);
        const { data } = await getHeroSection("domestic");
        console.log(data);
        setVideoUrl(data?.publicUrl[0]);
      } catch (error) {
        console.error("Error loading video:", error);
        setVideoUrl(null); // Set to null if there's an error
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
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
        <DestinationGrid
          destinations={domesticDestinations}
          title="Popular Domestic Destinations"
          type="domestic"
        />
      </div>

      <TravelGallery />
      <VideoTestimonials />
      <SubscribeUs />
      <Footer />
    </div>
  );
};

export default Domestic;
