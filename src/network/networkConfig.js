
export const API_BASE_URL = "http://localhost:5050/";

export const ENDPOINTS = {
  login: API_BASE_URL + "user/login",
  register: API_BASE_URL + "user/register",
  get_blogs: API_BASE_URL + "blog",
  create_blog: API_BASE_URL + "blog/create-blog",
  edit_blog: API_BASE_URL + "blog/edit-blog/:id",
  delete_blog: API_BASE_URL + "blog/delete-blog/:id",
  single_blog: API_BASE_URL + "blog/single-blog/:id",
  my_blogs: API_BASE_URL + "blog/my-blogs"
};


