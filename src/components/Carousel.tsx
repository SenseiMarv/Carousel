import { ReactElement, useCallback, useEffect, useRef, useState } from "react";

export default function Carousel({ images }: { images: ReactElement[] }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextImageIndex = useCallback(
    (next: number) => (next >= images.length - 1 ? 0 : next + 1),
    [images.length]
  );
  const previousImageIndex = useCallback(
    (prev: number) => (prev === 0 ? images.length - 1 : prev - 1),
    [images.length]
  );
  const startInterval = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex(nextImageIndex);
    }, 3000);
  }, [nextImageIndex]);

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

  // Keyboard events
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Auto change image
  useEffect(() => {
    startInterval();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [images.length, nextImageIndex, startInterval]);

  // Fade effect
  useEffect(() => {
    setIsFading(true);
    const fadeTimeout = setTimeout(() => {
      setIsFading(false);
    }, 500);

    return () => clearTimeout(fadeTimeout);
  }, [currentImageIndex]);

  const handleNextImage = () => {
    setCurrentImageIndex(nextImageIndex);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      startInterval();
    }
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex(previousImageIndex);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      startInterval();
    }
  };

  return (
    <div
      className="relative"
      style={{
        minWidth: images[0].props.width,
        minHeight: images[0].props.height,
      }}
    >
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 transition-opacity duration-500 ${
            currentImageIndex === index && !isFading
              ? "opacity-100"
              : "opacity-0"
          }`}
        >
          {image}
        </div>
      ))}
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
