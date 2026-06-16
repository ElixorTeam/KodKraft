import { RATE_LIMIT_COOLDOWN_MS } from "../config";

const recentSubmissions = new Map();

export const checkIsValidPhone = (phone: string) => {
  const now = Date.now();
  const lastTime = recentSubmissions.get(phone);

  if (lastTime && now - lastTime < RATE_LIMIT_COOLDOWN_MS) return false;

  recentSubmissions.set(phone, now);
  return true;
};
