import { useEffect, useRef, useState } from "react";
import { useModalStore } from "../../../store/modalStore";
import { useAuthStore } from "../../../store/authStore";
import { getEnrollments } from "../../../api/courses";
import { Link } from "react-router-dom";
import { Calendar, Clock, Users, MapPin, Star } from "lucide-react";
import { Enrollment } from "../../../types";
import EmptyBoxIcon from "../../../assets/EmptyBoxIcon.svg";
const Sidebar = () => {
  const { isSidebarOpen, closeAll } = useModalStore();
  const { token } = useAuthStore();
  const overlayRef = useRef<HTMLDivElement>(null);

  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!isSidebarOpen || !token) return;

    const fetchEnrollments = async () => {
      setIsLoading(true);
      try {
        const data = await getEnrollments(token);
        setEnrollments(data);
      } catch (error) {
        console.error("Failed to fetch enrollments:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEnrollments();
  }, [isSidebarOpen, token]);
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (overlayRef.current && e.target === overlayRef.current) {
        closeAll();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [closeAll]);
  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);
  return (
    <>
      <div
        ref={overlayRef}
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${
          isSidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-130 bg-[#F3F4F6] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-8 py-6 bg-[#F3F4F6]">
          <h2 className="text-2xl font-bold text-(--text-primary)">
            Enrolled Courses
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">
              Total Enrollments{" "}
              <span className="font-semibold text-(--text-primary)">
                {isLoading ? "..." : enrollments.length}
              </span>
            </span>
            <button
              onClick={closeAll}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
              aria-label="Close sidebar"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M12 4L4 12M4 4l8 8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {isLoading ? (
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-4 flex gap-4 animate-pulse"
                >
                  <div className="w-35 h-25 bg-gray-200 rounded-lg shrink-0" />
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-2/3" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : enrollments.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full min-h-100 gap-5 text-center">
              <img src={EmptyBoxIcon} alt="empty box icon" />
              <div>
                <p className="text-lg font-bold text-[#130E67]">
                  No Enrolled Courses Yet
                </p>
                <p className="text-sm text-[#130E67] mt-1">
                  Your learning journey starts here!
                  <br />
                  Browse courses to get started.
                </p>
              </div>
              <Link to="/browse" onClick={closeAll}>
                <button className="px-8 py-3 bg-[#4F46E5] text-white rounded-lg font-semibold hover:bg-[#4338CA] transition-colors cursor-pointer">
                  Browse Courses
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {enrollments.map((enrollment) => (
                <div
                  key={enrollment.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm"
                >
                  <div className="flex gap-4 p-4">
                    <div className="shrink-0 w-35 h-25 rounded-lg overflow-hidden bg-gray-900">
                      <img
                        src={enrollment.course.image}
                        alt={enrollment.course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs text-gray-500">
                          Instructor{" "}
                          <span className="font-medium text-gray-700">
                            {enrollment.course.instructor.name}
                          </span>
                        </p>
                        <div className="flex items-center gap-1">
                          <Star
                            size={13}
                            className="text-yellow-400 fill-yellow-400"
                          />
                          <span className="text-xs font-semibold">
                            {enrollment.course.avgRating}
                          </span>
                        </div>
                      </div>

                      <p className="font-bold text-sm text-(--text-primary) mb-2 leading-snug">
                        {enrollment.course.title}
                      </p>

                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <Calendar size={11} />
                          <span>
                            {enrollment.schedule.weeklySchedule.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <Clock size={11} />
                          <span>{enrollment.schedule.timeSlot.label}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <Users size={11} />
                          <span className="capitalize">
                            {enrollment.schedule.sessionType.name}
                          </span>
                        </div>
                        {enrollment.schedule.location && (
                          <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            <MapPin size={11} />
                            <span>{enrollment.schedule.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="px-4 pb-4 flex items-center gap-4">
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">
                        {enrollment.progress}% Complete
                      </p>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#4F46E5] rounded-full transition-all"
                          style={{ width: `${enrollment.progress}%` }}
                        />
                      </div>
                    </div>
                    <Link
                      to={`/course/${enrollment.course.id}`}
                      onClick={closeAll}
                    >
                      <button className="px-5 py-1.5 border border-[#4F46E5] text-[#4F46E5] text-sm rounded-lg font-medium hover:bg-[#4F46E5] hover:text-white transition-colors shrink-0 cursor-pointer">
                        View
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
