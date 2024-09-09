import axios from "axios";
import { BASE_URL } from "../constant/constant";

export const login = async (data: { email: string; password: string }) =>
  axios.post(BASE_URL + "/users/login", data);
