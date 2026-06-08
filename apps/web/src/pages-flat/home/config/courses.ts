import CourseImage1 from "@/shared/assets/courses/course-1.png";
import CourseImage2 from "@/shared/assets/courses/course-2.png";
import CourseImage3 from "@/shared/assets/courses/course-3.png";
import CourseImage4 from "@/shared/assets/courses/course-4.png";
import CourseImage5 from "@/shared/assets/courses/course-5.png";

const courses = [
  {
    imageSrc: CourseImage2,
    name: "Scratch",
    group: "7-10 лет",
    price: 5000,
    metric: "course-scratch",
    description:
        "Создаём простые игры и анимации в визуальной среде. Ребёнок учится логике, последовательности действий и основам программирования."
  },
  {
    imageSrc: CourseImage1,
    name: "Python",
    group: "с 11 лет",
    price: 5000,
    metric: "course-python",
    description:
        "Изучаем основы программирования на Python, создаём первые программы и простые приложения, развивая мышление разработчика."
  },
  {
    imageSrc: CourseImage4,
    name: "Pygame",
    group: "с 14 лет",
    price: 5000,
    metric: "course-pygame",
    description:
        "Создаём 2D-игры на Python, изучаем игровую логику, управление персонажами и базовые принципы геймдизайна."
  },
  {
    imageSrc: CourseImage5,
    name: "Godot",
    group: "с 14 лет",
    price: 5000,
    metric: "course-godot",
    description:
        "Разрабатываем игры на движке Godot. Учимся работать со сценами, логикой игры и базовыми игровыми механиками."
  },
  {
    imageSrc: CourseImage3,
    name: "C#",
    group: "с 15 лет",
    price: 5000,
    metric: "course-csharp",
    description:
        "Изучаем C# и основы современной разработки. Создаём небольшие проекты и учимся писать структурированный код."
  },
];

export { courses };
