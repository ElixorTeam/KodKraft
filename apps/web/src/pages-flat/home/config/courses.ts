import CourseImage1 from "@/shared/assets/courses/course-1.png";
import CourseImage2 from "@/shared/assets/courses/course-2.png";
import CourseImage3 from "@/shared/assets/courses/course-3.png";
import CourseImage4 from "@/shared/assets/courses/course-4.png";
import CourseImage5 from "@/shared/assets/courses/course-5.png";

const courses = [
  {
    imageSrc: CourseImage1,
    name: "Python",
    group: "с 11 лет",
    price: 5000,
    description:
      "Изучаем основы программирования, создаём первые приложения и учимся мыслить как разработчики."
  },
  {
    imageSrc: CourseImage2,
    name: "Scratch",
    group: "7-10 лет",
    price: 5000,
    description:
      "Создаём игры и анимации в визуальной среде, развивая логику и креативное мышление."
  },
  {
    imageSrc: CourseImage3,
    name: "C#",
    group: "c 15 лет",
    price: 5000,
    description:
      "Осваиваем современный язык разработки и создаём полноценные проекты и игровые механики."
  },
  {
    imageSrc: CourseImage4,
    name: "Pygame",
    group: "c 14 лет",
    price: 5000,
    description:
      "Программируем собственные 2D-игры на Python и изучаем принципы геймдизайна."
  },
  {
    imageSrc: CourseImage5,
    name: "Godot",
    group: "c 14 лет",
    price: 5000,
    description:
      "Разрабатываем игры на профессиональном движке и изучаем основы игровой логики и сцен."
  }
];

export { courses };
