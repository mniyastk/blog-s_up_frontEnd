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
        <>
            {isVisible ? (
                <img className={`${h} ${w} rounded-md`} ref={imgRef} src={src} alt={alt} />
            ) : (
                <div ref={imgRef} className={`skeleton ${w} ${h}`}></div>
            )}
        </>
    );
};

export default LazyLoadedImage;
