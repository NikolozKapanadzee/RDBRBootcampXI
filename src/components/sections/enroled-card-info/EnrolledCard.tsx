import CalendarIcon from "../../../assets/CalendarSetIcon.svg";
import ClockIcon from "../../../assets/ClockSetIcon.svg";
import MonitorIcon from "../../../assets/MonitorSetIcon.svg";
import LocationIcon from "../../../assets/LocationSetIcon.svg";

const EnrolledCard = ({ enrollment }: { enrollment: any }) => {
  const { schedule } = enrollment;
  const progress = enrollment.progress ?? 0;

  return (
    <div className="bg-[#F5F5F5] rounded-2xl p-6 flex flex-col gap-5">
      <span className="bg-indigo-100 text-indigo-700 text-sm font-medium px-5 py-2 rounded-full w-fit">
        Enrolled
      </span>
      <div className="flex flex-col gap-4.5 text-[#3D3D3D] text-sm">
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
      <button className="w-full py-4 rounded-xl bg-indigo-600 text-white font-medium flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors mt-4">
        Complete Course
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
      </button>
    </div>
  );
};

export default EnrolledCard;
