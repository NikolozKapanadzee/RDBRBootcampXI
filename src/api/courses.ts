export const getFeaturedCourses = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_BASE_URL}/courses/featured`,
  );
  const data = await res.json();
  return data.data;
};
