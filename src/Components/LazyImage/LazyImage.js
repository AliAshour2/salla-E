import React, { useState } from "react";

const LazyImage = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      className={`${className} ${isLoaded ? "loaded" : "loading"}`}
      onLoad={() => setIsLoaded(true)}
      loading="lazy"
    />
  );
};

export default LazyImage;
