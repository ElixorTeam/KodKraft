import type { PhoneNumber } from "libphonenumber-js";

export interface CallbackPayload {
  name: string;
  phone: PhoneNumber;
  metric?: string;
  date: Date;
}

export interface NotificationProvider {
  send(payload: CallbackPayload): Promise<void>;
}
