import axios from "axios";

export const API_URL = "https://nostrada-kys.ru";
const token =
  "8cb66fdf1102d5404bef9b30ef9a471b22a7e87c9cb339d9b3ed4443540f7c518d69b854215273175db5539407b00b28e1d634d3a79253ada4b98cb795f06480863207c52cc28f4fee96e975f38c82ed0add20af151333ebd775af573a0e5fc5ae82cc690ae5002fcd9fb64098d7a7ca2da4a7c587f7ab0f3bd9f3804fe9f282";

export const axiosInstanse = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthorizationHeader = () => {
  axiosInstanse.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

setAuthorizationHeader();
