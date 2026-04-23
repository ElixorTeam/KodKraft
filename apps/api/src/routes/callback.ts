import { Hono } from "hono";
import { check, object, optional, pipe, string } from "valibot";
import { vValidator } from "@hono/valibot-validator";
import parsePhoneNumberFromString from "libphonenumber-js";
import { checkIsValidPhone } from "../utils/phone";
import { TelegramProvider } from "../services/notification/telegram-provider";
import type { CallbackPayload } from "../services/notification/types";

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
  
  const provider = new TelegramProvider()
  const payload: CallbackPayload = {
    name,
    phone: parsedPhone,
    metric: metric,
    date: new Date(),
  };
  
  await provider.send(payload);
  return c.json({ success: true });
});

export { app as callbackRouter };
