import axios from "axios";
import { ImageLoaderProps } from "next/image";

const baseURL = "https://jsonplaceholder.typicode.com";

export const ALBUMS_QUERY = ["albums"];
export const getAlbums = async () => {
  const url = `${baseURL}/albums/1/photos`;
  return await axios.get<JSONPlaceholder.Album[]>(url).then((res) => res.data);
};

export const jsonPlaceholderImageLoader = ({
  src,
  width,
  quality,
}: ImageLoaderProps) => {
  return src;
};
