import { Hono } from "hono";
import { cors } from "hono/cors";
import { config } from "./config";
import { callbackRouter } from "./routes/callback";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: config.FRONTEND_URL,
    allowMethods: ["GET", "POST", "OPTIONS"]
  })
);

app.get("/api/status", (c) => c.text("OK"));

app.route("/api/callback", callbackRouter);

app.notFound((c) => c.json({ message: "Not found" }, 404));

export default app;
