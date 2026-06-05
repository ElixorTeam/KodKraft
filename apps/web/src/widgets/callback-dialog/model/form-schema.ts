import parsePhoneNumberFromString from "libphonenumber-js";
import * as v from "valibot";

const NAME_MAX_LENGTH = 16;

const formSchema = v.object({
  name: v.pipe(
    v.string(),
    v.nonEmpty("Пожалуйста, введите ваше имя."),
    v.maxLength(
      NAME_MAX_LENGTH,
      `Имя не должно превышать ${NAME_MAX_LENGTH} символов.`
    )
  ),
  phone: v.pipe(
    v.string(),
    v.nonEmpty("Пожалуйста, введите номер телефона."),
    v.check(
      (phone) => parsePhoneNumberFromString(phone, "RU")?.isValid() ?? false,
      "Введите корректный номер телефона."
    )
  )
});

export { NAME_MAX_LENGTH };

export { formSchema };
