// src/services/testService.js
import axios from "../utils/axios";

// Oddiy foydalanuvchi uchun token (testlarni ko‘rish)
const getUserHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Admin uchun token (test yaratish, o‘chirish, yangilash)
const getAdminHeaders = () => {
  const token = localStorage.getItem("adminToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Testlarni olish (foydalanuvchi uchun)
export const getTestById = async (id) => {
  const res = await axios.get(`/tests/${id}`, getUserHeaders());
  return res.data;
};

export const getTestsByLesson = async (lessonId) => {
  const res = await axios.get(`/tests?lessonId=${lessonId}`, getUserHeaders());
  return res.data;
};

export const getTestSummary = async () => {
  const res = await axios.get(`/tests/summary`, getUserHeaders());
  return res.data;
};

// Test yaratish (admin)
export const createTest = async (data) => {
  const res = await axios.post(`/tests`, data, getAdminHeaders());
  return res.data;
};

// Testni yangilash (admin)
export const updateTest = async (id, data) => {
  const res = await axios.put(`/tests/${id}`, data, getAdminHeaders());
  return res.data;
};

// Testni o‘chirish (admin)
export const deleteTest = async (id) => {
  const res = await axios.delete(`/tests/${id}`, getAdminHeaders());
  return res.data;
};
