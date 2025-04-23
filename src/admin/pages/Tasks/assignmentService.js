const API_URL = "http://localhost:8080/api/assignments";
const LESSON_API = "http://localhost:8080/api/lessons";
const TOKEN = localStorage.getItem("adminToken");

const authHeader = {
  Authorization: `Bearer ${TOKEN}`,
};

// Barcha topshiriqlarni olish
export const getAllAssignments = async () => {
  const res = await fetch(API_URL, { headers: authHeader });
  if (!res.ok) throw new Error("Topshiriqlarni olishda xatolik");
  return res.json();
};

// Bitta topshiriqni olish
export const getAssignmentById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { headers: authHeader });
  if (!res.ok) throw new Error("Topshiriqni olishda xatolik");
  return res.json();
};

// Yangi topshiriq yaratish
export const createAssignment = async (data) => {
  const formData = new FormData();
  formData.append("lessonId", data.lessonId);
  formData.append("description", data.description);
  data.files.forEach((file) => formData.append("files", file));

  const res = await fetch(API_URL, {
    method: "POST",
    headers: authHeader,
    body: formData,
  });
  if (!res.ok) throw new Error("Yaratishda xatolik");
  return res.json();
};

// Topshiriqni yangilash
export const updateAssignment = async (id, data) => {
  const formData = new FormData();
  formData.append("lessonId", data.lessonId);
  formData.append("description", data.description);
  data.files.forEach((file) => formData.append("files", file));

  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: authHeader,
    body: formData,
  });
  if (!res.ok) throw new Error("Yangilashda xatolik");
  return res.json();
};

// Topshiriqni o‘chirish
export const deleteAssignment = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: authHeader,
  });
  if (!res.ok) throw new Error("O‘chirishda xatolik");
  return res.json();
};

// Darslar ro‘yxatini olish (assignment yaratishda kerak)
export const getAllLessons = async () => {
  const res = await fetch(LESSON_API, { headers: authHeader });
  if (!res.ok) throw new Error("Darslarni olishda xatolik");
  return res.json();
};

// Foydalanuvchi topshirgan javoblarni olish
export const getAssignmentSubmissions = async (assignmentId) => {
  const res = await fetch(`${API_URL}/${assignmentId}/submissions`, {
    headers: authHeader,
  });
  if (!res.ok) throw new Error("Javoblarni olishda xatolik");
  return res.json();
};

// Foydalanuvchi topshirgan javobni holatini yangilash
export const updateSubmissionStatus = async (submissionId, status) => {
  const res = await fetch(`http://localhost:8080/api/submissions/${submissionId}/status`, {
    method: "PUT",
    headers: {
      ...authHeader,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Statusni yangilashda xatolik");
  return res.json();
};
