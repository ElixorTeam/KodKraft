import parsePhoneNumber from "libphonenumber-js";

const contacts = {
  telegram: "https://t.me/kodkraft",
  vk: "https://vk.com/kodkraft",
  whatsapp: "https://wa.me/+79209004445",
  email: "info@kodkraft.com",
  phone: parsePhoneNumber("+79209004445", "RU"),
  yandexMap: "https://yandex.com/maps/-/CPukiIOS"
};

export { contacts };
