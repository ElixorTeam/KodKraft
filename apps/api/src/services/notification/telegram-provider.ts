import { bot, config } from "../../config";
import type { NotificationProvider, CallbackPayload } from "./types";

export class TelegramProvider implements NotificationProvider {
  async send(payload: CallbackPayload) {
    const { name, phone, metric, date } = payload;

    const dateRu = date.toLocaleDateString("ru-RU", {
      timeZone: "Europe/Moscow"
    });

    const timeRu = date.toLocaleTimeString("ru-RU", {
      timeZone: "Europe/Moscow",
      hour: "2-digit",
      minute: "2-digit"
    });

    const lines = [
      "📲 Новая запись!\n",
      `Имя: ${name}`,
      `Номер: ${phone.number}`,
      metric ? `Метрика: ${metric}` : null,
      `Дата: ${dateRu}`,
      `Время: ${timeRu}`
    ].filter((x): x is string => x !== null);

    await bot.api.sendMessage(config.TELEGRAM_CHAT_ID, lines.join("\n"), {
      parse_mode: "HTML"
    });
  }
}
