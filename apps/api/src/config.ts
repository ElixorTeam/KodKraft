import { env } from "bun";
import { Bot } from "grammy";
import { object, string, pipe, nonEmpty, minLength, parse } from "valibot";

const envSchema = object({
  TELEGRAM_BOT_TOKEN: pipe(string(), nonEmpty(), minLength(20)),
  TELEGRAM_CHAT_ID: pipe(string(), nonEmpty(), minLength(8)),
  FRONTEND_URL: pipe(string(), nonEmpty())
});

export const config = parse(envSchema, env);

export const bot = new Bot(config.TELEGRAM_BOT_TOKEN);
