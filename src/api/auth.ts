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
