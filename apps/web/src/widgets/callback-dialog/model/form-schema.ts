import * as v from "valibot";

const formSchema = v.object({
  name: v.pipe(v.string(), v.nonEmpty("Пожалуйста, введите ваше имя.")),
  phone: v.pipe(
    v.string(),
    v.regex(
      /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
      "Введите номер в формате +7 (999) 999-99-99"
    )
  )
});

export { formSchema };
