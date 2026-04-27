import axios from "axios";

/* =========================
   AXIOS INSTANCE
========================= */
const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  // IMPORTANT: should be http://localhost:5000/api
});

/* =========================
   AUTO ATTACH TOKEN
========================= */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/* =========================
   GLOBAL RESPONSE HANDLING (optional but useful)
========================= */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // normalize error so frontend never crashes
    return Promise.reject(error);
  }
);

/* =========================
   AUTH APIs
========================= */
export const loginUser = async (data) => {
  try {
    const res = await api.post("/user/login", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (data) => {
  try {
    const res = await api.post("/user/register", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

/* =========================
   CONTACT APIs
========================= */

// GET all contacts
export const getContacts = async () => {
  try {
    const res = await api.get("/contacts");
    return res.data;
  } catch (error) {
    throw error;
  }
};

// CREATE contact
export const addContact = async (data) => {
  try {

    const res = await api.post("/contacts", {
      name: data.name,
      contactNum: data.contactNum,
      profileUrl: data.profileUrl || "",
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

// UPDATE contact
export const updateContact = async (id, data) => {
  try {
    const res = await api.put(`/contacts/${id}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// DELETE contact
export const deleteContact = async (id) => {
  try {
    const res = await api.delete(`/contacts/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

/* =========================
   EXPORT INSTANCE (optional)
========================= */
export default api;