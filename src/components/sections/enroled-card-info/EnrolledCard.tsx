import { useState } from "react";
import CalendarIcon from "../../../assets/CalendarSetIcon.svg";
import ClockIcon from "../../../assets/ClockSetIcon.svg";
import MonitorIcon from "../../../assets/MonitorSetIcon.svg";
import LocationIcon from "../../../assets/LocationSetIcon.svg";
import CongratsIcon from "../../../assets/CongratsIcon.svg";
import {
  completeEnrollment,
  submitReview,
  deleteEnrollment,
} from "../../../api/courses";
import { useAuthStore } from "../../../store/authStore";

const StarRating = ({
  value,
  onChange,
  readonly = false,
}: {
  value: number;
  onChange?: (v: number) => void;
  readonly?: boolean;
}) => {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = (hovered || value) >= star;
        return (
          <button
            key={star}
            type="button"
            disabled={readonly}
            onClick={() => onChange?.(star)}
            onMouseEnter={() => !readonly && setHovered(star)}
            onMouseLeave={() => !readonly && setHovered(0)}
            className={`text-3xl transition-colors ${readonly ? "cursor-default" : "cursor-pointer"}`}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill={filled ? "#F4A316" : "#D1D5DB"}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </button>
        );
      })}
    </div>
  );
};

const EnrolledCard = ({
  enrollment,
  courseId,
  courseTitle,
  onCompleted,
}: {
  enrollment: any;
  courseId: number;
  courseTitle: string;
  onCompleted?: (updated: any) => void;
}) => {
  const { token } = useAuthStore();
  const { schedule } = enrollment;

  const isCompleted = enrollment.progress === 100;
  const existingRating = enrollment.review?.rating ?? null;

  const [isCompleting, setIsCompleting] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [rating, setRating] = useState(0);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [submittedRating, setSubmittedRating] = useState<number | null>(
    existingRating,
  );
  const [showRatingCard, setShowRatingCard] = useState(
    isCompleted && existingRating === null,
  );
  const [showRetakeConfirm, setShowRetakeConfirm] = useState(false);
  const [isRetaking, setIsRetaking] = useState(false);

  const progress = isCompleted ? 100 : (enrollment.progress ?? 0);

  const handleComplete = async () => {
    if (!token) return;
    setIsCompleting(true);
    try {
      const { status, data } = await completeEnrollment(enrollment.id, token);
      if (status === 200 || status === 201) {
        onCompleted?.(data.data ?? { ...enrollment, progress: 100 });
        setShowCongrats(true);
      }
    } finally {
      setIsCompleting(false);
    }
  };

  const handleSubmitRating = async () => {
    if (!token || rating === 0) return;
    setIsSubmittingReview(true);
    try {
      const { status } = await submitReview(courseId, rating, token);
      if (status === 200 || status === 201) {
        setSubmittedRating(rating);
        setShowRatingCard(false);
      }
    } finally {
      setIsSubmittingReview(false);
      setShowCongrats(false);
    }
  };

  const handleCongratsClose = () => {
    setShowCongrats(false);
    if (rating === 0) setShowRatingCard(true);
  };

  const handleRetake = async () => {
    if (!token) return;
    setIsRetaking(true);
    try {
      const status = await deleteEnrollment(enrollment.id, token);
      if (status === 204) {
        onCompleted?.(null);
      }
    } finally {
      setIsRetaking(false);
      setShowRetakeConfirm(false);
    }
  };

  return (
    <>
      <div className="bg-[#F5F5F5] rounded-2xl p-6 flex flex-col gap-5">
        {isCompleted ? (
          <span className="bg-green-100 text-green-600 text-sm font-medium px-5 py-2 rounded-full w-fit">
            Completed
          </span>
        ) : (
          <span className="bg-indigo-100 text-indigo-700 text-sm font-medium px-5 py-2 rounded-full w-fit">
            Enrolled
          </span>
        )}
        <div className="flex flex-col gap-4 text-[#3D3D3D] text-sm">
          <div className="flex items-start gap-2">
            <img src={CalendarIcon} alt="calendar icon" className="h-6 w-6" />
            <span>{schedule.weeklySchedule.label}</span>
          </div>
          <div className="flex items-start gap-2">
            <img src={ClockIcon} alt="clock icon" className="h-6 w-6" />
            <span>{schedule.timeSlot.label}</span>
          </div>
          <div className="flex items-start gap-2">
            <img src={MonitorIcon} alt="monitor icon" className="h-6 w-6" />
            <span className="capitalize">{schedule.sessionType.name}</span>
          </div>
          {schedule.location && (
            <div className="flex items-start gap-2">
              <img src={LocationIcon} alt="location icon" className="h-6 w-6" />
              <span>{schedule.location}</span>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-[#3D3D3D]">
            {progress}% Complete
          </span>
          <div className="w-full bg-indigo-100 rounded-full h-5">
            <div
              className="bg-indigo-600 h-5 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        {isCompleted ? (
          <button
            onClick={() => setShowRetakeConfirm(true)}
            className="w-full py-4 rounded-xl bg-indigo-600 text-white font-medium flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors cursor-pointer"
          >
            Retake Course
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M23 4v6h-6" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
          </button>
        ) : (
          <button
            onClick={handleComplete}
            disabled={isCompleting}
            className="w-full py-4 rounded-xl bg-indigo-600 text-white font-medium flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors cursor-pointer disabled:opacity-70"
          >
            {isCompleting ? "Completing..." : "Complete Course"}
            {!isCompleting && (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </button>
        )}
        {isCompleted && showRatingCard && (
          <div className="bg-white rounded-xl p-5 flex flex-col gap-3 relative">
            <button
              onClick={() => setShowRatingCard(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <p className="text-sm text-center text-[#3D3D3D]">
              Rate your experience
            </p>
            <div className="flex justify-center">
              <StarRating value={rating} onChange={setRating} />
            </div>
            <button
              onClick={handleSubmitRating}
              disabled={rating === 0 || isSubmittingReview}
              className="w-full py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              {isSubmittingReview ? "Submitting..." : "Submit Rating"}
            </button>
          </div>
        )}
        {isCompleted && submittedRating !== null && !showRatingCard && (
          <div className="bg-white rounded-xl p-5 flex flex-col gap-3 relative">
            <button
              onClick={() => setSubmittedRating(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <p className="text-sm text-center text-[#3D3D3D]">
              You've already rated this course
            </p>
            <div className="flex justify-center">
              <StarRating value={submittedRating} readonly />
            </div>
          </div>
        )}
      </div>
      {showCongrats && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-10 max-w-sm w-full mx-4 flex flex-col items-center gap-5">
            <img src={CongratsIcon} alt="congrats icon" />
            <h3 className="text-2xl font-bold text-[#3D3D3D] text-center">
              Congratulations!
            </h3>
            <p className="text-gray-500 text-center text-sm leading-relaxed">
              You've completed "{courseTitle}" Course!
            </p>
            <div className="flex flex-col items-center gap-2 w-full">
              <p className="text-indigo-600 font-medium text-sm">
                Rate your experience
              </p>
              <StarRating value={rating} onChange={setRating} />
            </div>
            <button
              onClick={rating > 0 ? handleSubmitRating : handleCongratsClose}
              disabled={isSubmittingReview}
              className="w-full py-4 rounded-xl bg-[#4F46E5] text-white font-medium hover:bg-indigo-800 transition-colors disabled:opacity-70"
            >
              {isSubmittingReview ? "Submitting..." : "Done"}
            </button>
          </div>
        </div>
      )}
      {showRetakeConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 flex flex-col gap-4">
            <h3 className="text-xl font-bold text-[#130E67]">Retake Course?</h3>
            <p className="text-gray-500 text-sm">
              This will remove your current enrollment. You'll be able to enroll
              again with a new schedule.
            </p>
            <div className="flex gap-3 mt-2">
              <button
                onClick={() => setShowRetakeConfirm(false)}
                className="flex-1 py-3 rounded-xl border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRetake}
                disabled={isRetaking}
                className="flex-1 py-3 rounded-xl bg-[#130E67] text-white text-sm font-medium hover:bg-indigo-800 transition-colors disabled:opacity-70"
              >
                {isRetaking ? "Removing..." : "Yes, Retake"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EnrolledCard;
