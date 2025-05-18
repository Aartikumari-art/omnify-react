export const API_BASE_URL = "http://localhost:5050/";
export const LIVE_BASE_URL = "https://blog-node-rb97.onrender.com/";

export const ENDPOINTS = {
  login: LIVE_BASE_URL + "user/login",
  register: LIVE_BASE_URL + "user/register",
  get_blogs: LIVE_BASE_URL + "blog",
  create_blog: LIVE_BASE_URL + "blog/create-blog",
  edit_blog: LIVE_BASE_URL + "blog/edit-blog/:id",
  delete_blog: LIVE_BASE_URL + "blog/delete-blog/:id",
  single_blog: LIVE_BASE_URL + "blog/single-blog/:id",
  my_blogs: LIVE_BASE_URL + "blog/my-blogs",
};
