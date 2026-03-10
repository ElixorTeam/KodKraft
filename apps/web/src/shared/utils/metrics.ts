import { reachGoal } from "astro-ym";

const sendMetric = (target: string, params?: Record<string, any>) => {
  if (import.meta.env.DEV) return;
  reachGoal(target, params, 107232679);
};

export { sendMetric };
