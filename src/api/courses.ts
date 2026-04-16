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
export const getWeeklySchedules = async (courseId: number) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_BASE_URL}/courses/${courseId}/weekly-schedules`,
  );
  const data = await res.json();
  return data.data;
};
export const getTimeSlots = async (courseId: number, scheduleId: number) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_BASE_URL}/courses/${courseId}/time-slots?weekly_schedule_id=${scheduleId}`,
  );
  const data = await res.json();
  return data.data;
};
export const getSessionTypes = async (
  courseId: number,
  scheduleId: number,
  timeSlotId: number,
) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_BASE_URL}/courses/${courseId}/session-types?weekly_schedule_id=${scheduleId}&time_slot_id=${timeSlotId}`,
  );
  const data = await res.json();
  return data.data;
};
export const enrollInCourse = async (
  courseId: number,
  courseScheduleId: number,
  force: boolean = false,
  token: string,
) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_BASE_URL}/enrollments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ courseId, courseScheduleId, force }),
    },
  );
  const data = await res.json();
  return { status: res.status, data };
};
export const completeEnrollment = async (
  enrollmentId: number,
  token: string,
) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_BASE_URL}/enrollments/${enrollmentId}/complete`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const data = await res.json();
  return { status: res.status, data };
};
export const submitReview = async (
  courseId: number,
  rating: number,
  token: string,
) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_BASE_URL}/courses/${courseId}/reviews`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ rating }),
    },
  );
  const data = await res.json();
  return { status: res.status, data };
};
export const deleteEnrollment = async (enrollmentId: number, token: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_BASE_URL}/enrollments/${enrollmentId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.status;
};
