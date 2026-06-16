import { parsePhoneNumberWithError, type PhoneNumber } from "libphonenumber-js";

function formatPhone(phone: PhoneNumber): string {
  return phone.formatNational().replace(/^8/, "+7");
}

const formatAddress = (): string =>
  `г. ${contacts.address.locality}, ${contacts.address.streetAddress}, ${contacts.address.floor}`;

const contacts = {
  telegram: "https://t.me/kodkraft33",
  vk: "https://vk.com/kodkraft33",
  max: "https://max.ru/id332908581520_biz",
  phone: parsePhoneNumberWithError("+79209004445", "RU"),
  yandexMap: "https://yandex.com/maps/-/CPukiIOS",
  fio: "Александров Даниил Дмитриевич",
  inn: "332908581520",
  ogrnip: "325330000066328",
  address: {
    streetAddress: "ул. Чехова, 5",
    locality: "Владимир",
    floor: "2 этаж",
    postalCode: "600006"
  },
  openingHours: "Пн-Вс: 9:00–21:00"
};

export { contacts, formatAddress, formatPhone };
