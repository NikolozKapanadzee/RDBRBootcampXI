export const getFeaturedCourses = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_BASE_URL}/courses/featured`,
  );
  const data = await res.json();
  return data.data;
};
export const getCourses = async (params?: {
  page?: number;
  categories?: number[];
  topics?: number[];
  instructors?: number[];
  sort?: string;
  search?: string;
}) => {
  const query = new URLSearchParams();

  if (params?.page) query.append("page", String(params.page));
  if (params?.sort) query.append("sort", params.sort);
  if (params?.search) query.append("search", params.search);
  params?.categories?.forEach((id) => query.append("categories[]", String(id)));
  params?.topics?.forEach((id) => query.append("topics[]", String(id)));
  params?.instructors?.forEach((id) =>
    query.append("instructors[]", String(id)),
  );

  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_BASE_URL}/courses?${query}`,
  );
  const data = await res.json();
  return data;
};
export const getAllCourses = async () => {
  let allCourses: any[] = [];
  const firstRes = await fetch(
    `${import.meta.env.VITE_BACKEND_BASE_URL}/courses?page=1`,
  );
  const firstData = await firstRes.json();
  allCourses = [...firstData.data];
  const lastPage = firstData.meta.lastPage;
  for (let page = 2; page <= lastPage; page++) {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/courses?page=${page}`,
    );
    const data = await res.json();
    allCourses = [...allCourses, ...data.data];
  }
  return allCourses;
};
export const getCourseById = async (id: number) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_BASE_URL}/courses/${id}`,
  );
  const data = await res.json();
  return data.data;
};
