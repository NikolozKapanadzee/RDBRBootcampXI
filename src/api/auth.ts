import Cookies from "js-cookie";
export const loginUser = async (email: string, password: string) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

export const registerUser = async (data: any) => {
  const formData = new FormData();
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("password_confirmation", data.confirmPassword);
  formData.append("username", data.username);
  if (data.avatar) formData.append("avatar", data.avatar);
  const res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/register`, {
    method: "POST",
    body: formData,
  });
  return res.json();
};
export const getMe = async (token?: string) => {
  const authToken = token || Cookies.get("token");
  if (!authToken) throw new Error("No token found");
  const res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch user data");
  }
  return res.json();
};
