import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getHeroSection } from "../api/api";
import NavBar from "../Components/NavBar";
import SubscribeUs from "../forms/SubscribeUs";
import VideoTestimonials from "../Components/VideoTestimonials";
import TravelGallery from "../Components/TravelGallery";
import Footer from "../Components/Footer";
import HeroDomestic from "../Components/heroSection/HeroReusable";
import DestinationGrid from "../Components/destinations/DestinationGrid";
import { internationalDestinations } from "../data/destinations"; // Import international destinations
import HeroReusable from "../Components/heroSection/HeroReusable";

const International = () => {
  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);
        const { data } = await getHeroSection("international");
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
        title="Discover international Destinations"
      />

      <DestinationGrid
        destinations={internationalDestinations}
        title="Popular International Destinations"
        type="international"
      />

      <TravelGallery />
      <VideoTestimonials />
      <SubscribeUs />
      <Footer />
    </div>
  );
};

export default International;
