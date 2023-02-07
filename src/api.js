const url = import.meta.env.VITE_API_URL;

const register = async (user) => {
  const data = await fetch(`${url}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return await data.json();
};

const login = async (user) => {
  const data = await fetch(`${url}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return await data.json();
};

const checkProtected = async () => {
  const token = localStorage.getItem("token") || "";
  const data = await fetch(`${url}/protected`, {
    method: "GET",
    headers: {
      Authorization: `${token}`,
    },
  });
  return await data.json();
};

const logout = async () => {
  const token = localStorage.getItem("token") || "";
  const data = await fetch(`${url}/logout`, {
    method: "POST",
    headers: {
      Authorization: `${token}`,
    },
  });
  localStorage.removeItem("token");
  return await data.json();
};

const getProducts = async () => {
  const token = localStorage.getItem("token") || "";
  const data = await fetch(`${url}/products`, {
    method: "GET",
    headers: {
      Authorization: `${token}`,
    },
  });
  return await data.json();
};

const createProduct = async (product) => {
  const token = localStorage.getItem("token") || "";
  const data = await fetch(`${url}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify(product),
  });
  return await data.json();
};

const getProduct = async (id) => {
  const token = localStorage.getItem("token") || "";
  const data = await fetch(`${url}/products/${id}`, {
    method: "GET",
    headers: {
      Authorization: `${token}`,
    },
  });
  return await data.json();
};

const updateProduct = async (id, product) => {
  const token = localStorage.getItem("token") || "";
  const data = await fetch(`${url}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify(product),
  });
  return await data.json();
};

const deleteProduct = async (id) => {
  const token = localStorage.getItem("token") || "";
  const data = await fetch(`${url}/products/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });
  return await data.json();
};

export default {
  register,
  login,
  checkProtected,
  logout,
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
