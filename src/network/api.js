import axios from "axios";
import { toast } from "react-toastify";
import { ENDPOINTS } from "./networkConfig";
const getAuthToken = () => {
  const res = localStorage.getItem("token");
  if (!res) {
    toast.error("Auth token not found. Please log in.", {
      position: "top-right",
      autoClose: 3000,
    });
    return null;
  }

  try {
    const data = JSON.parse(res);
    return data.token || null;
  } catch (err) {
    toast.error("Failed to parse auth data from localStorage.");
    return null;
  }
};



// // Common headers with authorization
// const commonHeaders = (isJson = true) => {
//   const token = getAuthToken();
//   if (!token) {
//     throw new Error("Missing authentication token.");
//   }
//   return {
//     Authorization: `Bearer ${token}`,
//     "Content-Type": isJson ? "application/json" : "multipart/form-data",
//   };
// };

// Auth APIs



export const registerApi = async (payload) => {
  try {
    const response = await axios.post(ENDPOINTS.register, payload, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Registration failed");
    throw error;
  }
};

export const loginApi = async (payload) => {
  try {
    const response = await axios.post(ENDPOINTS.login, payload, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Login failed");
    throw error;
  }
};



export const getBlogsApi = async (page = 1) => {
  try {
    const response = await axios.get(`${ENDPOINTS.get_blogs}?page=${page}`);
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to fetch blogs");
    throw error;
  }
};

export const createBlogApi = async ({ title, content }) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
   ENDPOINTS.create_blog,
    { title, content }, 
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


  
export const editBlogApi = async (blogId, payload) => {
  const token = localStorage.getItem("token");
  const url = ENDPOINTS.edit_blog.replace(":id", blogId);

  try {
    const response = await axios.put(url, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to update blog");
    throw error;
  }
};

export const deleteBlogApi = async (blogId) => {
  const token = localStorage.getItem("token");
  const url = ENDPOINTS.delete_blog.replace(":id", blogId);

  try {
    const response = await axios.delete(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to delete blog");
    throw error;
  }
};


export const myBlogApi = async (page = 1) => {
  const token = localStorage.getItem("token");

  const url = `${ENDPOINTS.my_blogs}?page=${page}`;
  const response = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};



export const singleBlogApi = async (blogId, payload) => {
  try {
    const url = ENDPOINTS.single_blog.replace(":id", blogId);
    const response = await axios.get(url, payload);
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to update blog");
    throw error;
  }
};