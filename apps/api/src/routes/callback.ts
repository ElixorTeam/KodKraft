import { Hono } from "hono";
import { check, object, pipe, string } from "valibot";
import { vValidator } from "@hono/valibot-validator";
import parsePhoneNumberFromString from "libphonenumber-js";
import { bot, config } from "../config";

const recentSubmissions = new Map();
const COOLDOWN = 10 * 60 * 1000;

const checkIsValidPhone = (phone: string) => {
  const now = Date.now();
  const lastTime = recentSubmissions.get(phone);
  const isValid = lastTime && now - lastTime < COOLDOWN;
  if (isValid) recentSubmissions.set(phone, now);
  return isValid;
};

const app = new Hono();

const callbackSchema = object({
  name: string(),
  phone: pipe(
    string(),
    check((phone) => {
      return parsePhoneNumberFromString(phone, "RU")?.isValid() ?? false;
    }, "Invalid phone number")
  )
});

app.post("/api/callback", vValidator("json", callbackSchema), async (c) => {
  const { name, phone } = c.req.valid("json");

  if (!checkIsValidPhone(phone))
    return c.json(
      { success: false, message: "You have already sent recently" },
      429
    );

  const displayPhone = parsePhoneNumberFromString(
    phone,
    "RU"
  )?.formatNational();

  const time = new Date().toLocaleString("ru-RU");

  const text = `📲 Новая запись!\n\nИмя: ${name}\nНомер: ${displayPhone}\nВремя: ${time}`;

  await bot.api.sendMessage(config.TELEGRAM_CHAT_ID, text, {
    parse_mode: "HTML"
  });

  return c.json({ success: true });
});

export { app as callbackRouter };
