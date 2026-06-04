import {
  parsePhoneNumberWithError,
  type PhoneNumber
} from "libphonenumber-js";

function formatPhone(phone: PhoneNumber): string {
  return phone.formatNational().replace(/^8/, "+7");
}

const contacts = {
  telegram: "https://t.me/kodkraft33",
  vk: "https://vk.com/kodkraft33",
  max: "https://max.ru/id332908581520_biz",
  phone: parsePhoneNumberWithError("+79209004445", "RU"),
  yandexMap: "https://yandex.com/maps/-/CPukiIOS",
  fio: "Александров Д.Д",
  inn: "332908581520",
  ogrnip: "325330000066328"
};

export { contacts, formatPhone };
