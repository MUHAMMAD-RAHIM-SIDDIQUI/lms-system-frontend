import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// server root url, images are served from here (not from /api)
export const SERVER_URL = import.meta.env.VITE_SERVER_URL;

// small helper so we don't repeat the same axios setup twice
function makeInstance(tokenKey) {
  const instance = axios.create({ baseURL: BASE_URL });

  // attach the token before every request (if we have one saved)
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem(tokenKey);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
}

// student and trainer are two separate logins, so two separate instances
export const studentAxios = makeInstance("studentToken");
export const trainerAxios = makeInstance("trainerToken");

// plain instance for calls that use a token coming from somewhere else
// (like the signup temp token or the reset-password token in the url)
export const plainAxios = axios.create({ baseURL: BASE_URL });

// backend always sends a "message" field, so try to read that first
export function getErrorMessage(err) {
  return (
    err?.response?.data?.message ||
    err?.message ||
    "Something went wrong, please try again"
  );
}

// build full image url from a filename saved in the db
export function imageUrl(image) {
  if (!image) return "";
  if (image.startsWith("http")) return image;
  return `${SERVER_URL}/${image}`;
}
