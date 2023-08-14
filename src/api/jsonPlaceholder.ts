import axios from "axios";

const baseURL = "https://jsonplaceholder.typicode.com";

export const ALBUMS_QUERY = ["albums"];
export const getAlbums = async () => {
  const url = `${baseURL}/albums/1/photos`;
  return await axios.get<JSONPlaceholder.Album[]>(url).then((res) => res.data);
};
