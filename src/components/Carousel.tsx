import { ReactNode } from "react";

export default function Carousel({ images }: { images: ReactNode[] }) {
  return (
    <div>
      {images.map((image) => (
        <>{image}</>
      ))}
    </div>
  );
}
