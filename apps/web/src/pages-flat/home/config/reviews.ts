const reviews = [
  {
    name: "Тимофей Мишин",
    publishedAt: "2026-06-03",
    rating: 5,
    description:
      "Занимался здесь 2,5 года, готовился к ОГЭ и ЕГЭ. Получил норм баллы, их хватило для поступления в универ.\n" +
        "Обучение проходило онлайн, занимался с преподавательницей Дарьей — ей отдельное спасибо за поддержку и " +
        "понятное объяснение материала. Рекомендую! 👍"
  },
  {
    name: "Ирина",
    publishedAt: "2026-05-30",
    rating: 5,
    description:
        "Хочу сказать огромное спасибо за уроки программирования, Ульяне очень нравилось , много нового узнала , " +
        "надеюсь продолжим и в следующем году. 🤗❤️"
  },
  {
    name: "Вера Платонова",
    publishedAt: "2026-05-30",
    rating: 5,
    description:
        "Уважаемые преподаватели! Также присоединяемся к словам благодарности! Благодарим Вас за интересные занятия и ждём встречи в следующем учебном году!"
  },
  {
    name: "Чечельницкая Юлия",
    publishedAt: "2026-01-21",
    rating: 5,
    description:
      "Отличная школа для изучения разных языков программирования! Хожу не первый год, все очень нравится." +
        " Атмосфера приятная, объяснения доступные, большой объём информации. Занимаюсь онлайн, что очень удобно," +
        " а самое главное не менее продуктивно, чем очное обучение. Легко подстроить занятия даже под самый загруженный" +
        " график, что является несомненным плюсом."
  },
  {
    name: "Антон",
    publishedAt: "2025-08-17",
    rating: 5,
    description:
      "Весной брат Евгений закончил курс по Scratch, ему очень понравилось, всегда ходил с удовольствием. " +
        "В этом году планируем продолжить и пойти на Python. Спасибо, всё было здорово!"
  },
  {
    name: "Александр Поляков",
    publishedAt: "2024-02-04",
    rating: 5,
    description:
        "Отличная секция! Ходим второй месяц, ребёнок в восторге. Грамотные и  внимательные педагоги-работают не только с группой, но и с каждым индивидуально. Всем советую"
  },
  {
    name: "Александр Поляков",
    publishedAt: "2023-12-22",
    rating: 5,
    description:
        "Отличное место для изучения программирования, все доступно рассказывают ребята, знающие и любящие свое дело, охотно делясь опытом! Рекомендую!"
  },
  {
    name: "Алексей Теплов",
    publishedAt: "2023-11-27",
    rating: 5,
    description:
      "Ходил младший брат , ребенку все понравилось , доброжелательные преподаватели , все на высшем уровне , всем советую!"
  }
];

const reviewDateFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "long",
  year: "numeric"
});

const formatReviewDate = (publishedAt: string): string => {
  const [year, month, day] = publishedAt.split("-").map(Number);
  const parts = reviewDateFormatter.formatToParts(new Date(year, month - 1, day));

  return parts
    .filter((part) => part.type === "day" || part.type === "month" || part.type === "year")
    .map((part) => part.value)
    .join(" ");
};

const buildReviewsSchema = (organizationId: string) => {
  const reviewCount = reviews.length;
  const ratingValue =
    reviewCount === 0
      ? 0
      : reviews.reduce((sum, item) => sum + item.rating, 0) / reviewCount;

  return {
    aggregateRating: {
      "@type": "AggregateRating" as const,
      ratingValue: ratingValue.toFixed(1),
      reviewCount,
      bestRating: 5,
      worstRating: 1
    },
    review: reviews.map((item) => ({
      "@type": "Review" as const,
      author: {
        "@type": "Person" as const,
        name: item.name
      },
      datePublished: item.publishedAt,
      reviewRating: {
        "@type": "Rating" as const,
        ratingValue: item.rating,
        bestRating: 5,
        worstRating: 1
      },
      reviewBody: item.description,
      itemReviewed: {
        "@id": organizationId
      }
    }))
  };
};

export { buildReviewsSchema, formatReviewDate, reviews };
