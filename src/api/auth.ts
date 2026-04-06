export const loginUser = async (email: string, password: string) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};
