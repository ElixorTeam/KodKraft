import { serve, env } from "bun";

const BOT_TOKEN = env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = env.TELEGRAM_CHAT_ID;
const FRONTEND_URL = env.FRONTEND_URL;

if (!BOT_TOKEN || !CHAT_ID || !FRONTEND_URL)
  throw new Error("BOT_TOKEN или CHAT_ID не установлены в .env");

const recentSubmissions = new Map();
const COOLDOWN = 10 * 60 * 1000;

const corsHeaders = {
  "Access-Control-Allow-Origin": FRONTEND_URL,
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const jsonHeaders = {
  ...corsHeaders,
  "Content-Type": "application/json",
};

const server = serve({
  port: 3000,
  routes: {
    "/api/status": new Response("OK", { headers: corsHeaders }),

    "/api/callback": {
      OPTIONS: () => new Response(null, { status: 204, headers: corsHeaders }),

      POST: async (req) => {
        try {
          const body = await req.json();
          const { name, phone } = body;

          if (!name || !phone) {
            return new Response(
              JSON.stringify({
                success: false,
                error: "Name and phone required",
              }),
              { status: 400, headers: jsonHeaders },
            );
          }

          const now = Date.now();
          const lastTime = recentSubmissions.get(phone);

          if (lastTime && now - lastTime < COOLDOWN) {
            return new Response(
              JSON.stringify({
                success: false,
                message: "Вы уже отправляли недавно",
              }),
              { status: 429, headers: jsonHeaders },
            );
          }

          recentSubmissions.set(phone, now);

          const time = new Date().toLocaleString("ru-RU");
          const text = `📲 Новая запись!\n\nИмя: ${name}\nНомер: ${phone}\nВремя: ${time}`;

          await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: CHAT_ID, text }),
          });

          return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: jsonHeaders,
          });
        } catch (err: any) {
          return new Response(
            JSON.stringify({ success: false, error: err.message }),
            { status: 500, headers: jsonHeaders },
          );
        }
      },
    },

    "/*": {
      OPTIONS: () => new Response(null, { status: 204, headers: corsHeaders }),

      GET: () =>
        Response.json(
          { message: "Not found" },
          { status: 404, headers: jsonHeaders },
        ),
      POST: () =>
        Response.json(
          { message: "Not found" },
          { status: 404, headers: jsonHeaders },
        ),
      PATCH: () =>
        Response.json(
          { message: "Not found" },
          { status: 404, headers: jsonHeaders },
        ),
      PUT: () =>
        Response.json(
          { message: "Not found" },
          { status: 404, headers: jsonHeaders },
        ),
      DELETE: () =>
        Response.json(
          { message: "Not found" },
          { status: 404, headers: jsonHeaders },
        ),
    },
  },
});

console.log(`Сервер запущен на ${server.url}`);
