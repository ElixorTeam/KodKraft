import CourseImage1 from "@/shared/assets/courses/course-1.png";
import CourseImage2 from "@/shared/assets/courses/course-2.png";
import CourseImage3 from "@/shared/assets/courses/course-3.png";
import CourseImage4 from "@/shared/assets/courses/course-4.png";
import CourseImage5 from "@/shared/assets/courses/course-5.png";

const courses = [
  {
    imageSrc: CourseImage2,
    name: "Scratch",
    group: "7–10 лет",
    price: 5000,
    metric: "course-scratch",
    description:
      "Визуальное программирование: собираем игры и анимации из блоков. Ребёнок понимает логику, циклы и условия — без страха перед «настоящим» кодом."
  },
  {
    imageSrc: CourseImage1,
    name: "Python",
    group: "с 11 лет",
    price: 5000,
    metric: "course-python",
    description:
      "Первый язык: пишем программы, скрипты и простые приложения. Учимся думать как разработчик и решать задачи по шагам."
  },
  {
    imageSrc: CourseImage4,
    name: "Pygame",
    group: "с 14 лет",
    price: 5000,
    metric: "course-pygame",
    description:
      "Делаем 2D-игры на Python: персонажи, столкновения, счёт. Закрепляем основы языка через то, что детям действительно интересно."
  },
  {
    imageSrc: CourseImage5,
    name: "Godot",
    group: "с 14 лет",
    price: 5000,
    metric: "course-godot",
    description:
      "Собираем игры на движке Godot: сцены, скрипты, механики. Шаг к профессиональным инструментам геймдева."
  },
  {
    imageSrc: CourseImage3,
    name: "C#",
    group: "с 15 лет",
    price: 5000,
    metric: "course-csharp",
    description:
      "Основы C# и структурированный код. Небольшие проекты и привычка писать аккуратно — хорошая база для дальнейшего обучения."
  }
];

const buildCoursesOfferCatalog = (organizationId: string) => ({
  "@type": "OfferCatalog" as const,
  name: "Курсы программирования",
  itemListElement: courses.map((item) => ({
    "@type": "Course" as const,
    name: item.name,
    description: item.description,
    courseMode: ["onsite", "online"] as const,
    provider: {
      "@id": organizationId
    },
    offers: {
      "@type": "Offer" as const,
      price: item.price,
      priceCurrency: "RUB",
      priceSpecification: {
        "@type": "UnitPriceSpecification" as const,
        price: item.price,
        priceCurrency: "RUB",
        unitText: "месяц"
      }
    }
  }))
});

export { buildCoursesOfferCatalog, courses };
