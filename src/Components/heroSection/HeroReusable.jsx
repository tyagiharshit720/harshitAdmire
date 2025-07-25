import React from 'react';
import PropTypes from 'prop-types';

const HeroReusable = ({ videoUrl, title }) => {
  console.log("Video URL:", videoUrl);
  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-black">
      <video
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        src={videoUrl}
      >
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white text-center">
          {title}
        </h1>
      </div>
    </section>
  );
};

HeroReusable.propTypes = {
  source: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default HeroReusable;
