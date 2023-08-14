import { ReactElement, useEffect, useState } from "react";

export default function Carousel({ images }: { images: ReactElement[] }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev >= images.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev >= images.length - 1 ? 0 : prev + 1));
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="relative">
      {images[currentImageIndex]}
      <div className="absolute flex justify-between left-10 right-10 top-1/2">
        <button
          onClick={handlePreviousImage}
          className="rounded-full h-10 w-10 bg-blue-600 shadow-md hover:bg-blue-500 transition-colors duration-200"
        >
          {"<"}
        </button>
        <button
          onClick={handleNextImage}
          className="rounded-full h-10 w-10 bg-blue-600 shadow-md hover:bg-blue-500 transition-colors duration-200"
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
