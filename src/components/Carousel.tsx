import { ReactElement, useCallback, useEffect, useState } from "react";

export default function Carousel({ images }: { images: ReactElement[] }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImageIndex = useCallback(
    (next: number) => (next >= images.length - 1 ? 0 : next + 1),
    [images.length]
  );
  const previousImageIndex = useCallback(
    (prev: number) => (prev === 0 ? images.length - 1 : prev - 1),
    [images.length]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentImageIndex(previousImageIndex);
      } else if (e.key === "ArrowRight") {
        setCurrentImageIndex(nextImageIndex);
      }
    },
    [nextImageIndex, previousImageIndex]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(nextImageIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length, nextImageIndex]);

  const handleNextImage = () => {
    setCurrentImageIndex(nextImageIndex);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex(previousImageIndex);
  };

  return (
    <div className="relative">
      {images[currentImageIndex]}
      <div className="absolute flex justify-between left-5 right-5 sm:left-10 sm:right-10 top-1/2">
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
