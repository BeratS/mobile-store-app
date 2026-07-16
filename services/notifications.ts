import { useBookingStore } from "@/stores/useBookingStore";
import * as Notifications from "expo-notifications";

const Weekday = {
  SUNDAY: 1,
  MONDAY: 2,
  TUESDAY: 3,
  WEDNESDAY: 4,
  THURSDAY: 5,
  FRIDAY: 6,
  SATURDAY: 7,
} as const;

const weekdays = [
  Weekday.MONDAY,
  Weekday.TUESDAY,
  Weekday.WEDNESDAY,
  Weekday.THURSDAY,
  Weekday.FRIDAY,
];

export async function manageWeekdayNotifications() {
  const { deskSlot, parkingSlot } = useBookingStore.getState();

  // 1. If BOTH are reserved, clear all pending reminders and exit
  if (deskSlot !== null && parkingSlot !== null) {
    console.log("Everything is reserved! Cancelling reminders.");
    await Notifications.cancelAllScheduledNotificationsAsync();
    return;
  }

  // 2. Otherwise, cancel old notifications first to avoid duplicates
  await Notifications.cancelAllScheduledNotificationsAsync();

  // Create customized notification copy depending on what is missing
  let title = "🚗 Parking & 💻 Desk Confirmation";
  let body = "Please confirm your bookings for tomorrow.";

  if (deskSlot !== null && parkingSlot === null) {
    title = "🚗 Parking Confirmation";
    body = "Your desk is booked! But you still need to reserve a parking space.";
  } else if (deskSlot === null && parkingSlot !== null) {
    title = "💻 Desk Confirmation";
    body = "Your parking is reserved! Please select a desk workstation.";
  }

  // 3. Schedule reminders for the missing selections
  for (const weekday of weekdays) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        categoryIdentifier: "reservation-reminder",
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
        weekday,
        hour: 9,
        minute: 0,
      },
    });
  }
  console.log("Weekly reminders scheduled successfully.");
}