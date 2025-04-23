// utils/auth.js
export const getAuthHeaders = () => {
  const token = localStorage.getItem("adminToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
