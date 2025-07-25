import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getHeroSection } from "../../api/api.js";

const ContactHero = () => {
  const navigate = useNavigate();
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [videoUrl, setVideoUrl] = useState();
  const [loading, setLoading] = useState(true);

  console.log("video url-->", videoUrl);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);

        const { data } = await getHeroSection("contact");
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
    <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
      <video
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        {videoUrl && <source src={videoUrl} type="video/mp4" />}
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white text-center">
          Welcome to Our Blog World
        </h1>
      </div>
    </section>
  );
};

export default ContactHero;
