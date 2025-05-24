import axios from "axios";

const BASE_URL = "https://budgettracker-5.onrender.com/api";

export const api = axios.create({
  baseURL: BASE_URL,
});

export const apiPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
