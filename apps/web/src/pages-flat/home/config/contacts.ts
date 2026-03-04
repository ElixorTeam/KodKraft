type ContactType = "phone" | "email" | "yandexMap";
type SocialType = "telegram" | "vk" | "whatsapp";

type BaseItem = {
  name: string;
};

type SocialItem = BaseItem & {
  type: SocialType;
  href: string;
};

type ContactItem = BaseItem & {
  type: ContactType;
  value: string;
  href: string;
};

type Item = SocialItem | ContactItem;

const contacts: Item[] = [
  { type: "telegram", name: "Telegram", href: "https://t.me/kodkraft" },
  { type: "vk", name: "ВКонтакте", href: "https://vk.com/kodkraft" },
  { type: "whatsapp", name: "WhatsApp", href: "https://wa.me/+79260000000" },
  {
    type: "email",
    name: "Email",
    value: "info@kodkraft.com",
    href: "mailto:info@kodkraft.com"
  },
  {
    type: "phone",
    name: "Телефон",
    value: "+79260000000",
    href: "tel:+79260000000"
  }
];

const getContact = <T extends ContactType>(
  type: T
): Extract<Item, { type: T }> | undefined =>
  contacts.find(
    (item): item is Extract<Item, { type: T }> => item.type === type
  );

const getSocial = <T extends SocialType>(
  type: T
): Extract<Item, { type: T }> | undefined =>
  contacts.find(
    (item): item is Extract<Item, { type: T }> => item.type === type
  );

export { contacts, getContact, getSocial };
