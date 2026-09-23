const TIME_SLOT_INTERVAL = 15; // assumed defined globally or import accordingly

// Cache object to store random blocked days per year-month
const blockedDaysCache: Record<string, number[]> = {};

function getRandomBlockedDays(year: number, month: number): number[] {
  const key = `${year}-${month}`;
  if (blockedDaysCache[key]) return blockedDaysCache[key];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const countToBlock = 3 + Math.floor(Math.random() * 2); // 3 or 4 days

  const blockedDays = new Set<number>();
  while (blockedDays.size < countToBlock) {
    // Pick a random day between 1 and daysInMonth
    const day = Math.floor(Math.random() * daysInMonth) + 1;
    blockedDays.add(day);
  }

  blockedDaysCache[key] = Array.from(blockedDays);
  return blockedDaysCache[key];
}

export function generateTimeSlots(date: Date, lang: string): string[] {
  const dayOfWeek = date.getDay();
  let startHour = 9;
  let endHour = 21;

  // Friday ends earlier
  if (dayOfWeek === 5) {
    endHour = 17;
  }

  const slots: string[] = [];

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += TIME_SLOT_INTERVAL) {
      slots.push(`${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`);
    }
  }

  return slots;
}

export type HebrewFormat = 'short' | 'medium' | 'full';

export function formatTime(
  time: string,
  lang: string,
  hebrewFormat: HebrewFormat = 'short'
): string {
  const [hour, minute] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(hour, minute);

  if (lang === 'it') {
    return date.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit', hour12: false });
  }

  if (lang === 'he') {
    let ampm: string;
    switch (hebrewFormat) {
      case 'medium':
        ampm = hour < 12 ? 'לפנה"צ' : 'אחה"צ';
        break;
      case 'full':
        ampm = hour < 12 ? 'לפני הצהריים' : 'אחרי הצהריים';
        break;
      default: // short
        ampm = hour < 12 ? 'לפ\'' : 'אח\'';
    }

    const formattedMinute = String(minute).padStart(2, '0');
    let formattedHour = hour % 12;
    if (formattedHour === 0) formattedHour = 12;
    return `${formattedHour}:${formattedMinute} ${ampm}`;
  }

  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

export function isTimeSlotAvailable(
  date: Date,
  startTime: string,
  duration: number, // in minutes
  dailySchedule: boolean[], // array of 15-min slots, true=booked
  longestServiceDuration: number
): boolean {
  const dayOfWeek = date.getDay();

  // Saturday is off
  if (dayOfWeek === 6) return false;

  // Check random blocked days (3-4 random days per month)
  const year = date.getFullYear();
  const month = date.getMonth();
  const blockedDays = getRandomBlockedDays(year, month);
  const dayOfMonth = date.getDate();
  if (blockedDays.includes(dayOfMonth)) return false;

  const [startHour, startMinute] = startTime.split(':').map(Number);
  const startIndex =
    (startHour - 9) * (60 / TIME_SLOT_INTERVAL) + startMinute / TIME_SLOT_INTERVAL;
  const slotsNeeded = Math.ceil(duration / TIME_SLOT_INTERVAL);

  if (startIndex < 0 || startIndex + slotsNeeded > dailySchedule.length) {
    return false;
  }

  for (let i = 0; i < slotsNeeded; i++) {
    if (dailySchedule[startIndex + i]) {
      return false; // Slot is booked
    }
  }
  return true;
}