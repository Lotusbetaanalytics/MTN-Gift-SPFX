import { helper } from "echarts";

const level: any = [
  { value: "Level 1" },
  { value: "Level 2" },
  { value: "Level 3" },
  { value: "Level 3H" },
  { value: "Level 4" },
  { value: "Level 5" },
  { value: "Level 6" },
];
const rating: any = [
  { value: "--Select Rating--" },
  { value: "1" },
  { value: "2" },
  { value: "3" },
  { value: "4" },
  { value: "5" },
];
const roles: any = [
  { value: "HR Administrator, Records" },
  { value: "HR HCM Administrator" },
  { value: "HR Analyst " },
];

const Helpers: any = {
  settings: {
    HR_Administrator_Records: [
      {
        display: "grid",
      },
    ],
    HR_HCM_Administrator: [
      {
        display: "none",
      },
    ],
    HR_Analyst: [
      {
        display: "none",
      },
    ],
    Employee: [
      {
        display: "none",
      },
    ],
  },
};

export default { level, rating, roles, Helpers };
