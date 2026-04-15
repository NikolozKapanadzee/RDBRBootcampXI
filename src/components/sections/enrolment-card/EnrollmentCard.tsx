import { useEffect, useState } from "react";
import {
  getWeeklySchedules,
  getTimeSlots,
  getSessionTypes,
} from "../../../api/courses";
import ArrowDownIcon from "../../../assets/glyphs_arrow-bold.svg";
import AuthReq from "../../ui/warning/AuthReq";
import { useAuthStore } from "../../../store/authStore";
import CompleteReq from "../../ui/warning/CompleteReq";

interface EnrollmentCardProps {
  courseId: number;
  basePrice: number;
}

const formatTime = (time: string) => {
  const [h, m] = time.split(":");
  const hour = parseInt(h);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${displayHour}:${m} ${ampm}`;
};

const ALL_SCHEDULES = [
  { key: "mon-wed", label: "Mon - Wed" },
  { key: "tue-thu", label: "Tue - Thu" },
  { key: "fri-sat", label: "Fri - Sat" },
  { key: "weekend", label: "Weekend" },
];
const ALL_TIME_SLOTS = [
  {
    key: "morning",
    name: "Morning",
    startTime: "09:00:00",
    endTime: "12:00:00",
  },
  {
    key: "afternoon",
    name: "Afternoon",
    startTime: "12:00:00",
    endTime: "18:00:00",
  },
  {
    key: "evening",
    name: "Evening",
    startTime: "18:00:00",
    endTime: "21:00:00",
  },
];

const ALL_SESSION_TYPES = [
  { key: "online", name: "Online", location: "Google Meet" },
  { key: "in-person", name: "In-Person", location: "Chavchavadze St.34" },
  { key: "hybrid", name: "Hybrid", location: "Chavchavadze St.34" },
];

const EnrollmentCard = ({ courseId, basePrice }: EnrollmentCardProps) => {
  const { token, user } = useAuthStore();
  const IsLoggedIn = !!token;
  const IsUserCompleted = user?.profileComplete;

  const [schedules, setSchedules] = useState<any[]>([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<any[]>([]);
  const [availableSessionTypes, setAvailableSessionTypes] = useState<any[]>([]);

  const [selectedSchedule, setSelectedSchedule] = useState<any>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<any>(null);
  const [selectedSession, setSelectedSession] = useState<any>(null);

  useEffect(() => {
    const fetch = async () => {
      const data = await getWeeklySchedules(courseId);
      setSchedules(data);
    };
    fetch();
  }, [courseId]);

  useEffect(() => {
    if (!selectedSchedule) return;
    setSelectedTimeSlot(null);
    setSelectedSession(null);
    setAvailableSessionTypes([]);
    const fetch = async () => {
      const data = await getTimeSlots(courseId, selectedSchedule.id);
      setAvailableTimeSlots(data);
    };
    fetch();
  }, [selectedSchedule]);

  useEffect(() => {
    if (!selectedSchedule || !selectedTimeSlot) return;
    setSelectedSession(null);
    const fetch = async () => {
      const data = await getSessionTypes(
        courseId,
        selectedSchedule.id,
        selectedTimeSlot.id,
      );
      setAvailableSessionTypes(data);
    };
    fetch();
  }, [selectedTimeSlot]);
  const getAvailableTimeSlot = (slot: (typeof ALL_TIME_SLOTS)[0]) =>
    availableTimeSlots.find((t) => t.startTime === slot.startTime);
  const getAvailableSession = (session: (typeof ALL_SESSION_TYPES)[0]) =>
    availableSessionTypes.find(
      (s) => s.name.toLowerCase() === session.key.toLowerCase(),
    );

  const sessionPrice = selectedSession
    ? parseFloat(selectedSession.priceModifier)
    : 0;
  const totalPrice = basePrice + sessionPrice;

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-[#F5F5F5] rounded-2xl p-6 flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full border-2 border-[#130E67] text-[#0A0836] text-xs flex items-center justify-center font-bold">
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
                    if (selectedSchedule?.label === s.label) {
                      setSelectedSchedule(null);
                      setSelectedTimeSlot(null);
                      setSelectedSession(null);
                      setAvailableTimeSlots([]);
                      setAvailableSessionTypes([]);
                    } else {
                      setSelectedSchedule(available);
                    }
                  }}
                  disabled={!isAvailable}
                  className={`flex-1 py-4 px-2 rounded-xl border text-sm font-medium transition-colors
          ${
            isSelected
              ? "border-indigo-600 bg-white text-indigo-700 cursor-pointer"
              : isAvailable
                ? "border-[#292929] bg-white text-[#292929] cursor-pointer"
                : "border-gray-100 bg-white text-gray-300 cursor-not-allowed"
          }`}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full border-2 border-gray-400 text-gray-400 text-xs flex items-center justify-center font-bold">
                2
              </span>
              <h3 className="text-xl font-bold text-gray-400">Time Slot</h3>
            </div>
            <img src={ArrowDownIcon} alt="arrow" className="cursor-pointer" />
          </div>
          {selectedSchedule && (
            <div className="flex gap-2">
              {ALL_TIME_SLOTS.map((slot) => {
                const available = getAvailableTimeSlot(slot);
                const isAvailable = !!available;
                const isSelected = selectedTimeSlot?.id === available?.id;

                return (
                  <button
                    key={slot.key}
                    onClick={() => {
                      if (!isAvailable) return;
                      if (selectedTimeSlot?.id === available.id) {
                        setSelectedTimeSlot(null);
                        setSelectedSession(null);
                        setAvailableSessionTypes([]);
                      } else {
                        setSelectedTimeSlot(available);
                      }
                    }}
                    disabled={!isAvailable}
                    className={`flex-1 py-3 px-3 rounded-xl border text-sm transition-colors flex flex-col gap-1
                      ${
                        isSelected
                          ? "border-indigo-600 bg-white text-indigo-700 cursor-pointer"
                          : isAvailable
                            ? "border-gray-200 bg-white text-gray-500 cursor-pointer"
                            : "border-gray-100 bg-white text-gray-300 cursor-not-allowed"
                      }`}
                  >
                    <span className="font-medium">{slot.name}</span>
                    <span className="text-xs">
                      {formatTime(slot.startTime)} – {formatTime(slot.endTime)}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full border-2 border-gray-400 text-gray-400 text-xs flex items-center justify-center font-bold">
                3
              </span>
              <h3 className="text-xl font-bold text-gray-400">Session Type</h3>
            </div>
            <img src={ArrowDownIcon} alt="arrow" className="cursor-pointer" />
          </div>
          {selectedTimeSlot && (
            <div className="flex gap-2">
              {ALL_SESSION_TYPES.map((session) => {
                const available = getAvailableSession(session);
                const isAvailable = !!available;
                const isSelected = selectedSession?.id === available?.id;
                const price = available
                  ? parseFloat(available.priceModifier)
                  : 0;

                return (
                  <button
                    key={session.key}
                    onClick={() => {
                      if (!isAvailable) return;
                      setSelectedSession(
                        selectedSession?.id === available.id ? null : available,
                      );
                    }}
                    disabled={!isAvailable}
                    className={`flex-1 py-3 px-3 rounded-xl border text-sm transition-colors flex flex-col items-center gap-1
                      ${
                        isSelected
                          ? "border-indigo-600 bg-white text-indigo-700 cursor-pointer"
                          : isAvailable
                            ? "border-gray-200 bg-white text-gray-500 cursor-pointer"
                            : "border-gray-100 bg-white text-gray-300 cursor-not-allowed"
                      }`}
                  >
                    <span className="font-medium">{session.name}</span>
                    <span className="text-xs">{session.location}</span>
                    {isAvailable && (
                      <span
                        className={`text-xs font-medium ${price === 0 ? "text-indigo-500" : "text-gray-600"}`}
                      >
                        {price === 0 ? "Included" : `+ $${price}`}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <div className="bg-white rounded-xl p-8 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm mb-10">Total Price</span>
            <span className="text-3xl font-bold text-[#333333]">
              ${Number(totalPrice).toFixed(0)}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#8A8A8A]">Base Price</span>
              <span className="text-[#333333]">
                + ${Number(basePrice).toFixed(0)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#8A8A8A]">Session Type</span>
              <span className="text-[#333333]">+ ${sessionPrice}</span>
            </div>
          </div>
          <button className="w-full bg-[#EEEDFC] text-[#B7B3F4] py-4 rounded-[10px] font-medium mt-2 cursor-pointer hover:bg-indigo-200 transition-colors">
            Enroll Now
          </button>
        </div>

        {!IsLoggedIn && <AuthReq />}
        {IsLoggedIn && !IsUserCompleted && <CompleteReq />}
      </div>
    </div>
  );
};

export default EnrollmentCard;
