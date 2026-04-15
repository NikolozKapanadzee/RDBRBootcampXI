import { useEffect, useState } from "react";
import {
  getWeeklySchedules,
  getTimeSlots,
  getSessionTypes,
} from "../../../api/courses";
import ArrowDownIcon from "../../../assets/glyphs_arrow-bold.svg";
interface EnrollmentCardProps {
  courseId: number;
  basePrice: number;
}

const shortLabel = (label: string) =>
  label
    .replace("Monday", "Mon")
    .replace("Tuesday", "Tue")
    .replace("Wednesday", "Wed")
    .replace("Thursday", "Thu")
    .replace("Friday", "Fri")
    .replace("Saturday", "Sat")
    .replace("Sunday", "Sun")
    .replace("Weekend Only", "Weekend");

const EnrollmentCard = ({ courseId, basePrice }: EnrollmentCardProps) => {
  const [schedules, setSchedules] = useState<any[]>([]);
  const [timeSlots, setTimeSlots] = useState<any[]>([]);
  const [sessionTypes, setSessionTypes] = useState<any[]>([]);

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
    setSessionTypes([]);
    const fetch = async () => {
      const data = await getTimeSlots(courseId, selectedSchedule.id);
      setTimeSlots(data);
      console.log("timeSlots", data);
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
      setSessionTypes(data);
      console.log("sessionTypes", data);
    };
    fetch();
  }, [selectedTimeSlot]);

  const sessionPrice = selectedSession?.priceModifier ?? 0;
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
            <img
              src={ArrowDownIcon}
              alt="arrow down icon"
              className="cursor-pointer"
            />
          </div>
          <div className="flex gap-2">
            {schedules.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSchedule(s)}
                className={`flex-1 w-40 h-23 rounded-xl border text-sm font-medium transition-colors cursor-pointer
                  ${
                    selectedSchedule?.id === s.id
                      ? "border-indigo-600 bg-white text-indigo-700"
                      : "border-[#292929] bg-white text-[#292929]"
                  }`}
              >
                {shortLabel(s.label)}
              </button>
            ))}
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
            <img
              src={ArrowDownIcon}
              alt="arrow down icon"
              className="cursor-pointer"
            />
          </div>
          {selectedSchedule && timeSlots.length > 0 && (
            <div className="flex gap-2">
              {timeSlots.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTimeSlot(t)}
                  className={`flex-1 py-3 px-3 rounded-xl border text-sm transition-colors cursor-pointer flex flex-col gap-1
                    ${
                      selectedTimeSlot?.id === t.id
                        ? "border-indigo-600 bg-white text-indigo-700"
                        : "border-gray-200 bg-white text-gray-500"
                    }`}
                >
                  <span className="font-medium">{t.name}</span>
                  <span className="text-xs text-gray-400">
                    {t.startTime} – {t.endTime}
                  </span>
                </button>
              ))}
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
            <img
              src={ArrowDownIcon}
              alt="arrow down icon"
              className="cursor-pointer"
            />
          </div>
          {selectedTimeSlot && sessionTypes.length > 0 && (
            <div className="flex gap-2">
              {sessionTypes.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSession(s)}
                  className={`flex-1 py-3 px-3 rounded-xl border text-sm transition-colors cursor-pointer flex flex-col items-center gap-1
                    ${
                      selectedSession?.id === s.id
                        ? "border-indigo-600 bg-white text-indigo-700"
                        : "border-gray-200 bg-white text-gray-500"
                    }`}
                >
                  <span className="font-medium">{s.name}</span>
                  <span className="text-xs text-gray-400">{s.location}</span>
                  <span
                    className={`text-xs font-medium ${s.priceModifier === 0 ? "text-indigo-500" : "text-gray-600"}`}
                  >
                    {s.priceModifier === 0
                      ? "Included"
                      : `+ $${s.priceModifier}`}
                  </span>
                </button>
              ))}
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
            <div className="flex items-center justify-between text-sm text-[#333333]">
              <span className="text-[#8A8A8A]">Base Price</span>
              <span className="text-[#333333]">+ $0</span>
            </div>
            <div className="flex items-center justify-between text-sm text-[#333333]">
              <span className="text-[#8A8A8A]">Session Type</span>
              <span className="text-[#333333]">+ ${sessionPrice}</span>
            </div>
          </div>
          <button className="w-full bg-[#EEEDFC] text-[#B7B3F4] py-4 rounded-[10px] font-medium mt-2 cursor-pointer hover:bg-indigo-200 transition-colors">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentCard;
