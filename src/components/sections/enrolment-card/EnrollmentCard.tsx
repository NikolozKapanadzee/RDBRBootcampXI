import { useEffect, useState } from "react";
import {
  getWeeklySchedules,
  getTimeSlots,
  getSessionTypes,
  enrollInCourse,
} from "../../../api/courses";
import ArrowDownIcon from "../../../assets/glyphs_arrow-bold.svg";
import AuthReq from "../../ui/warning/AuthReq";
import { useAuthStore } from "../../../store/authStore";
import CompleteReq from "../../ui/warning/CompleteReq";
import WarningIcon from "../../../assets/warning.svg";
import { ALL_SCHEDULES } from "../../../constants/all-schedules";
import { ALL_TIME_SLOTS } from "../../../constants/all-time-slots";
import { ALL_SESSION_TYPES } from "../../../constants/all-session-types";
import { useModalStore } from "../../../store/modalStore";
interface EnrollmentCardProps {
  courseId: number;
  basePrice: number;
  courseTitle: string;
  onSuccess: (enrollmentData: any) => void;
}
const formatTime = (time: string) => {
  const [h, m] = time.split(":");
  const hour = parseInt(h);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${displayHour}:${m} ${ampm}`;
};
const EnrollmentCard = ({
  courseId,
  basePrice,
  onSuccess,
}: EnrollmentCardProps) => {
  const { token, user } = useAuthStore();
  const IsLoggedIn = !!token;
  const IsUserCompleted = user?.profileComplete;

  const [schedules, setSchedules] = useState<any[]>([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<any[]>([]);
  const [availableSessionTypes, setAvailableSessionTypes] = useState<any[]>([]);

  const [selectedSchedule, setSelectedSchedule] = useState<any>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<any>(null);
  const [selectedSession, setSelectedSession] = useState<any>(null);

  const [isEnrolling, setIsEnrolling] = useState(false);
  const [showConflictModal, setShowConflictModal] = useState(false);
  const [conflictData, setConflictData] = useState<any[]>([]);

  const { openLogin } = useModalStore();

  const handleEnroll = async (force: boolean = false) => {
    if (!IsLoggedIn) {
      openLogin();
      return;
    }
    if (!selectedSession) return;
    setIsEnrolling(true);
    try {
      const { status, data } = await enrollInCourse(
        courseId,
        selectedSession.courseScheduleId,
        force,
        token,
      );
      if (status === 409 && data.conflicts?.length > 0) {
        setConflictData(data.conflicts);
        setShowConflictModal(true);
        return;
      }

      if (status === 200 || status === 201) {
        onSuccess(data.data);
      }
    } finally {
      setIsEnrolling(false);
    }
  };

  const handleEnrollClick = () => {
    if (!IsLoggedIn) {
      openLogin();
      return;
    }
    if (!selectedSession) return;
    handleEnroll(false);
  };

  useEffect(() => {
    const fetch = async () => {
      const data = await getWeeklySchedules(courseId);
      setSchedules(data);
    };
    fetch();
  }, [courseId]);

  useEffect(() => {
    if (!selectedSchedule) {
      setAvailableTimeSlots([]);
      return;
    }
    const fetch = async () => {
      const data = await getTimeSlots(courseId, selectedSchedule.id);
      setAvailableTimeSlots(data);
    };
    fetch();
  }, [selectedSchedule, courseId]);

  useEffect(() => {
    if (!selectedSchedule || !selectedTimeSlot) {
      setAvailableSessionTypes([]);
      return;
    }
    const fetch = async () => {
      const data = await getSessionTypes(
        courseId,
        selectedSchedule.id,
        selectedTimeSlot.id,
      );
      setAvailableSessionTypes(data);
    };
    fetch();
  }, [selectedTimeSlot, selectedSchedule, courseId]);

  const getAvailableTimeSlot = (slot: (typeof ALL_TIME_SLOTS)[0]) =>
    availableTimeSlots.find((t) => t.startTime === slot.startTime);

  const getAvailableSession = (session: (typeof ALL_SESSION_TYPES)[0]) =>
    availableSessionTypes.find(
      (s) => s.name.toLowerCase() === session.key.toLowerCase(),
    );

  const numericBasePrice = Number(basePrice) || 0;
  const sessionPrice = selectedSession
    ? Number(selectedSession.priceModifier)
    : 0;
  const totalPrice = numericBasePrice + sessionPrice;

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-[#F5F5F5] rounded-2xl p-6 flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#130E67] text-white text-xs flex items-center justify-center font-bold">
                1
              </span>
              <h3 className="text-xl font-bold text-[#130E67]">
                Weekly Schedule
              </h3>
            </div>
            <img src={ArrowDownIcon} alt="arrow" className="cursor-pointer" />
          </div>
          <div className="flex gap-2">
            {ALL_SCHEDULES.map((s) => {
              const available = schedules.find((sc) => sc.label === s.label);
              const isAvailable = !!available;
              const isSelected = selectedSchedule?.label === s.label;
              return (
                <button
                  key={s.key}
                  onClick={() => {
                    if (!isAvailable) return;
                    setSelectedSchedule(isSelected ? null : available);
                    setSelectedTimeSlot(null);
                    setSelectedSession(null);
                  }}
                  disabled={!isAvailable}
                  className={`flex-1 py-4 px-2 w-31 h-23 rounded-xl border text-sm font-medium transition-colors
                    ${
                      isSelected
                        ? "border-indigo-500 bg-indigo-100 text-indigo-700"
                        : isAvailable
                          ? "border-[#292929] bg-white text-[#292929] cursor-pointer hover:border-indigo-400"
                          : "border-transparent bg-[#EBEBEB] text-gray-400 cursor-not-allowed"
                    }`}
                >
                  {s.displayLabel}
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full border-2 text-xs flex items-center justify-center font-bold transition-colors ${selectedSchedule ? "bg-[#130E67] border-[#130E67] text-white" : "border-gray-400 text-gray-400"}`}
              >
                2
              </span>
              <h3
                className={`text-xl font-bold transition-colors ${selectedSchedule ? "text-[#130E67]" : "text-gray-400"}`}
              >
                Time Slot
              </h3>
            </div>
            <img src={ArrowDownIcon} alt="arrow" className="cursor-pointer" />
          </div>
          {selectedSchedule && (
            <div className="flex gap-2">
              {ALL_TIME_SLOTS.map((slot) => {
                const available = getAvailableTimeSlot(slot);
                const isAvailable = !!available;
                const isSelected =
                  selectedTimeSlot?.id === available?.id && isAvailable;
                return (
                  <button
                    key={slot.key}
                    onClick={() => {
                      if (!isAvailable) return;
                      setSelectedTimeSlot(isSelected ? null : available);
                      setSelectedSession(null);
                    }}
                    disabled={!isAvailable}
                    className={`w-43 h-15 p-3.75 rounded-xl border flex items-center gap-2.5 text-left transition-colors
    ${
      isSelected
        ? "border-indigo-500 bg-indigo-100 text-indigo-700"
        : isAvailable
          ? "border-gray-300 bg-white text-gray-600 cursor-pointer hover:border-indigo-400"
          : "border-transparent bg-[#EBEBEB] text-gray-400 cursor-not-allowed"
    }`}
                  >
                    <img
                      src={slot.icon}
                      alt={slot.name}
                      className={`w-6 h-6 shrink-0 ${
                        !isAvailable && "opacity-30 grayscale"
                      }`}
                    />
                    <div className="flex flex-col leading-tight">
                      <span className="font-medium text-[14px]">
                        {slot.name}
                      </span>
                      <span className="text-[9px] w-23">
                        {formatTime(slot.startTime)} –{" "}
                        {formatTime(slot.endTime)}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full border-2 text-xs flex items-center justify-center font-bold transition-colors ${selectedTimeSlot ? "bg-[#130E67] border-[#130E67] text-white" : "border-gray-400 text-gray-400"}`}
              >
                3
              </span>
              <h3
                className={`text-xl font-bold transition-colors ${selectedTimeSlot ? "text-[#130E67]" : "text-gray-400"}`}
              >
                Session Type
              </h3>
            </div>
            <img src={ArrowDownIcon} alt="arrow" className="cursor-pointer" />
          </div>
          {selectedTimeSlot && (
            <div className="flex gap-2">
              {ALL_SESSION_TYPES.map((session) => {
                const available = getAvailableSession(session);
                const isAvailable = !!available;
                const isFullyBooked =
                  isAvailable && available.availableSeats === 0;
                const isLowSeats =
                  isAvailable &&
                  available.availableSeats > 0 &&
                  available.availableSeats < 5;
                const isSelectable = isAvailable && !isFullyBooked;
                const isSelected =
                  selectedSession?.id === available?.id && isSelectable;
                const priceMod = available
                  ? Number(available.priceModifier)
                  : 0;
                return (
                  <div key={session.key} className="flex-1 flex flex-col gap-1">
                    <button
                      onClick={() => {
                        if (!isSelectable) return;
                        setSelectedSession(isSelected ? null : available);
                      }}
                      disabled={!isSelectable}
                      className={`w-full py-3 px-3 rounded-xl border text-sm transition-colors flex flex-col items-center gap-1
                        ${
                          isSelected
                            ? "border-indigo-500 bg-indigo-100 text-indigo-700"
                            : isSelectable
                              ? "border-gray-300 bg-white text-gray-600 cursor-pointer hover:border-indigo-400"
                              : "border-transparent bg-[#EBEBEB] text-gray-400 cursor-not-allowed"
                        }`}
                    >
                      <span className="font-medium">{session.name}</span>
                      <span className="text-xs">{session.location}</span>
                      <span
                        className={`text-xs font-medium ${
                          !isAvailable || isFullyBooked
                            ? "invisible"
                            : priceMod === 0
                              ? "text-indigo-500"
                              : "text-indigo-600"
                        }`}
                      >
                        {priceMod === 0 ? "Included" : `+ $${priceMod}`}
                      </span>
                    </button>
                    <div className="text-xs text-center min-h-4">
                      {isFullyBooked && (
                        <span className="text-red-500 font-medium">
                          Fully Booked
                        </span>
                      )}
                      {isLowSeats && (
                        <span className="text-[#F4A316] font-medium flex items-center justify-center gap-1 whitespace-nowrap">
                          <img src={WarningIcon} alt="warning icon" /> Only{" "}
                          {available.availableSeats} Seats Remaining
                        </span>
                      )}
                      {isAvailable && !isFullyBooked && !isLowSeats && (
                        <span className="text-[#3D3D3D]">
                          {available.availableSeats} Seats Available
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="bg-white rounded-xl p-8 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm mb-10">Total Price</span>
            <span className="text-3xl font-bold text-[#333333]">
              ${totalPrice.toFixed(0)}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#8A8A8A]">Base Price</span>
              <span className="text-[#333333]">
                + ${numericBasePrice.toFixed(0)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#8A8A8A]">Session Type</span>
              <span className="text-[#333333]">
                + ${sessionPrice.toFixed(0)}
              </span>
            </div>
          </div>
          <button
            onClick={handleEnrollClick}
            disabled={IsLoggedIn && !selectedSession && IsUserCompleted}
            className={`w-full py-4 rounded-[10px] font-medium mt-2 transition-all ${selectedSession ? "bg-[#130E67] text-white cursor-pointer hover:bg-indigo-800" : "bg-[#EEEDFC] text-[#B7B3F4] cursor-not-allowed"}`}
          >
            {isEnrolling ? "Enrolling..." : "Enroll Now"}
          </button>
        </div>
        {!IsLoggedIn && <AuthReq />}
        {IsLoggedIn && !IsUserCompleted && <CompleteReq />}
      </div>
      {showConflictModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 flex flex-col gap-4">
            <h3 className="text-lg font-bold text-[#130E67]">
              Schedule Conflict
            </h3>
            <div className="flex flex-col gap-2">
              {conflictData.map((conflict: any, i: number) => (
                <p key={i} className="text-sm text-gray-600">
                  You are already enrolled in{" "}
                  <span className="font-semibold text-[#130E67]">
                    {conflict.courseName}
                  </span>{" "}
                  with the same schedule:{" "}
                  <span className="font-medium">
                    {conflict.days} at {conflict.time}
                  </span>
                  .
                </p>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              Are you sure you want to continue?
            </p>
            <div className="flex gap-3 mt-2">
              <button
                onClick={() => setShowConflictModal(false)}
                className="flex-1 py-3 rounded-xl border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowConflictModal(false);
                  handleEnroll(true);
                }}
                className="flex-1 py-3 rounded-xl bg-[#130E67] text-white text-sm font-medium hover:bg-indigo-800 transition-colors"
              >
                Continue Anyway
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnrollmentCard;
