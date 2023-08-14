"use client";

import {
  ALBUMS_QUERY,
  getAlbums,
  jsonPlaceholderImageLoader,
} from "@/api/jsonPlaceholder";
import Carousel from "@/components/Carousel";
import ErrorAlert from "@/components/ErrorAlert";
import Spinner from "@/components/Spinner";
import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import Image from "next/image";
import { ReactElement } from "react";

export default function Home() {
  const { isLoading, error, data } = useQuery({
    queryKey: ALBUMS_QUERY,
    queryFn: getAlbums,
  });

  if (isLoading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );

  if (error && isAxiosError<JSONPlaceholder.Album[]>(error))
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <ErrorAlert message={error.message} />
      </div>
    );

  if (data) {
    const carouselOneImages = getThreeRandomImages(data).map((album) => (
      <Image
        key={album.id}
        loader={jsonPlaceholderImageLoader}
        src={album.url}
        alt={album.title}
        width={600}
        height={600}
        priority={true}
        unoptimized
      />
    ));
    const carouselTwoImages = getThreeRandomImages(data).map((album) => (
      <Image
        key={album.id}
        loader={jsonPlaceholderImageLoader}
        src={album.url}
        alt={album.title}
        width={600}
        height={600}
        priority={true}
        unoptimized
      />
    ));

    return (
      <div className="w-full h-full flex justify-center items-center flex-col gap-4">
        <Carousel images={carouselOneImages} />
        <Carousel images={carouselTwoImages} />
      </div>
    );
  }

  return null;
}

function getThreeRandomImages<T>(images: T[]) {
  return images.sort(() => 0.5 - Math.random()).slice(0, 3);
}
