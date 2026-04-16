import MorningIcon from "../assets/morningicon.svg";
import AfternoonIcon from "../assets/afternoonicon.svg";
import EveningIcon from "../assets/eveningicon.svg";
export const ALL_TIME_SLOTS = [
  {
    key: "morning",
    name: "Morning",
    startTime: "09:00:00",
    endTime: "12:00:00",
    icon: MorningIcon,
  },
  {
    key: "afternoon",
    name: "Afternoon",
    startTime: "12:00:00",
    endTime: "18:00:00",
    icon: AfternoonIcon,
  },
  {
    key: "evening",
    name: "Evening",
    startTime: "18:00:00",
    endTime: "21:00:00",
    icon: EveningIcon,
  },
];
