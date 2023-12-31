import {
  KeyboardEvent,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

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

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowLeft") {
      handleNextImage();
    } else if (e.key === "ArrowRight") {
      handlePreviousImage();
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
          key={image.key}
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
          onKeyDown={handleKeyDown}
          aria-label="Previous image"
          className="rounded-full h-10 w-10 bg-blue-600 shadow-md hover:bg-blue-500 transition-colors duration-200"
        >
          {"<"}
        </button>
        <button
          onClick={handleNextImage}
          onKeyDown={handleKeyDown}
          aria-label="Next image"
          className="rounded-full h-10 w-10 bg-blue-600 shadow-md hover:bg-blue-500 transition-colors duration-200"
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
