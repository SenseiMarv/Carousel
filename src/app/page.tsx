"use client";

import { ALBUMS_QUERY, getAlbums } from "@/api/jsonPlaceholder";
import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export default function Home() {
  const { isLoading, error, data } = useQuery({
    queryKey: ALBUMS_QUERY,
    queryFn: getAlbums,
  });
  console.log("Home -> isLoading, error, data:", isLoading, error, data);

  if (isLoading) return <div>Loading...</div>;

  if (error && isAxiosError<JSONPlaceholder.Album[]>(error))
    return <div>Error: {error.message}</div>;

  if (data) return <div>Albums: {data.length}</div>;

  return null;
}
