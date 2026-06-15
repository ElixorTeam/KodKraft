import type { OpeningHoursSpecification } from "schema-dts";

const school = {
  name: "КодКрафт",
  alternateNames: ["кодкрафт33", "kodkraft33", "КодКрафт33"],
  foundingYear: 2018,
  title: "КодКрафт — школа программирования для детей во Владимире",
  description:
    "Школа программирования КодКрафт во Владимире: курсы Scratch, Python, C#, Godot для детей с 7 лет. Офлайн и онлайн по России. Работаем 2018 года"
} as const;

const openingHoursSpecification: OpeningHoursSpecification = {
  "@type": "OpeningHoursSpecification",
  dayOfWeek: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ],
  opens: "09:00",
  closes: "21:00"
};

export { openingHoursSpecification, school };
