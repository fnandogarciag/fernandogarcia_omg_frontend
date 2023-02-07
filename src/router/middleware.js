import api from "../api";

const isLoggedIn = async () => {
  const data = await api.checkProtected();
  return data.login;
};

const guestMiddleware = async (to, from, next) => {
  const check = await isLoggedIn();
  if (check) {
    next({ name: "products" });
  } else {
    next();
  }
};

const authMiddleware = async (to, from, next) => {
  const check = await isLoggedIn();
  if (!check) {
    next({ name: "login" });
  } else {
    next();
  }
};

export { guestMiddleware, authMiddleware };
