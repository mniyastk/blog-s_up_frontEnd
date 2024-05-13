import { useEffect, useRef, useState } from "react";
const LazyLoadedImage = ({ src, alt, h, w }) => {
  const imgRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentImgRef = imgRef.current;

    if (currentImgRef) {
      observer.observe(currentImgRef);
    }

    return () => {
      if (currentImgRef) {
        observer.unobserve(currentImgRef);
      }
    };
  }, []);
  return (
    <img
      className={`${h} ${w}`}
      ref={imgRef}
      src={isVisible ? src : "https://res.cloudinary.com/dunf6rko6/image/upload/v1715598469/Animation_-_1715598292474_a1doq1.gif"}
      alt={alt}
    />
  );
};

export default LazyLoadedImage;
