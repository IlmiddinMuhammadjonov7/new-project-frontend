import axios from 'axios';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getUserProfile = async (userId) => {
  const res = await axios.get(`http://localhost:8080/api/users/${userId}`, getAuthHeader());
  return res.data;
};

export const updateUserProfile = async (userId, updatedData) => {
  const res = await axios.put(`http://localhost:8080/api/users/${userId}`, updatedData, getAuthHeader());
  return res.data;
};

export const getAllUsers = async () => {
  const token = localStorage.getItem("adminToken"); // yoki 'accessToken', qanday nomlading

  const res = await axios.get("http://localhost:8080/api/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
