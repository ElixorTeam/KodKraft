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
  const isRecent = lastTime && now - lastTime < COOLDOWN;

  if (isRecent) return false;

  recentSubmissions.set(phone, now);
  return true;
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

app.post("", vValidator("json", callbackSchema), async (c) => {
  const { name, phone } = c.req.valid("json");

  const parsedPhone = parsePhoneNumberFromString(phone, "RU");

  if (!parsedPhone)
    return c.json({ success: false, message: "Invalid phone number" }, 400);

  if (!checkIsValidPhone(parsedPhone.number))
    return c.json(
      { success: false, message: "You have already sent recently" },
      429
    );

  const displayPhone = parsedPhone.formatNational();
  const time = new Date().toLocaleString("ru-RU");
  const text = `📲 Новая запись!\n\nИмя: ${name}\nНомер: ${displayPhone}\nВремя: ${time}`;

  await bot.api.sendMessage(config.TELEGRAM_CHAT_ID, text, {
    parse_mode: "HTML"
  });

  return c.json({ success: true });
});

export { app as callbackRouter };
