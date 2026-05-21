import axios from "axios";

const API = "http://127.0.0.1:8000/api";

// GET USER
export const getUserByNip = async (nip) => {
  return await axios.get(`${API}/user/${nip}`);
};

// CREATE LAPORAN
export const createLaporan = async (data) => {
  return await axios.post(`${API}/laporan`, data);
};

// RIWAYAT
export const getRiwayat = async (nip) => {
  return await axios.get(`${API}/riwayat/${nip}`);
};
