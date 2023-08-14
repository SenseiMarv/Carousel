"use client";

import {
  ALBUMS_QUERY,
  getAlbums,
  jsonPlaceholderImageLoader,
} from "@/api/jsonPlaceholder";
import ErrorAlert from "@/components/ErrorAlert";
import Spinner from "@/components/Spinner";
import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import Image from "next/image";

export default function Home() {
  const { isLoading, error, data } = useQuery({
    queryKey: ALBUMS_QUERY,
    queryFn: getAlbums,
  });

  if (isLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );

  if (error && isAxiosError<JSONPlaceholder.Album[]>(error))
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ErrorAlert message={error.message} />
      </div>
    );

  if (data)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        {data.map((album) => (
          <Image
            key={album.id}
            loader={jsonPlaceholderImageLoader}
            src={album.url}
            alt={album.title}
            width={500}
            height={500}
          />
        ))}
      </div>
    );

  return null;
}
