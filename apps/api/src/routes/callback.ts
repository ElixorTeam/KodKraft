import { Hono } from "hono";
import { check, object, optional, pipe, string } from "valibot";
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
  ),
  metric: optional(string())
});

app.post("", vValidator("json", callbackSchema), async (c) => {
  const { name, phone, metric } = c.req.valid("json");

  const parsedPhone = parsePhoneNumberFromString(phone, "RU");

  if (!parsedPhone)
    return c.json({ success: false, message: "Invalid phone number" }, 400);

  if (!checkIsValidPhone(parsedPhone.number))
    return c.json(
      { success: false, message: "You have already sent recently" },
      429
    );

  const displayPhone = parsedPhone.number;

  const now = new Date();

  const date = now.toLocaleDateString("ru-RU", {
    timeZone: "Europe/Moscow"
  });

  const time = now.toLocaleTimeString("ru-RU", {
    timeZone: "Europe/Moscow",
    hour: "2-digit",
    minute: "2-digit",
  });

  const text = `
  📲 Новая запись!

  Имя: ${name}
  ${metric ? `Метрика: ${metric}` : ""}
  Номер: ${displayPhone}
  Дата: ${date},
  Время: ${time}
  `;

  await bot.api.sendMessage(config.TELEGRAM_CHAT_ID, text, {
    parse_mode: "HTML"
  });

  return c.json({ success: true });
});

export { app as callbackRouter };
