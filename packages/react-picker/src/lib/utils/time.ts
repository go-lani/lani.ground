import { TimeUnit } from '../TimePicker';

const TIME_ITEM_HEIGHT = 40;

export const scrollToCenter = (
  element: HTMLElement,
  index: number,
  smooth = true,
  isProgrammaticScrollRef: React.MutableRefObject<boolean>,
) => {
  requestAnimationFrame(() => {
    isProgrammaticScrollRef.current = true;
    const allItems = element.querySelectorAll('.time-option');
    if (allItems.length > 0 && allItems[index]) {
      const targetItem = allItems[index] as HTMLElement;
      const centerPosition =
        targetItem.offsetTop - (element.clientHeight - TIME_ITEM_HEIGHT) / 2;

      element.scrollTo({
        top: Math.max(0, centerPosition),
        behavior: smooth ? 'smooth' : 'auto',
      });
    }
    setTimeout(
      () => {
        isProgrammaticScrollRef.current = false;
      },
      smooth ? 300 : 50,
    );
  });
};

export const findClosestTimeItem = (element: HTMLElement) => {
  if (!element) return -1;

  const scrollTop = element.scrollTop;
  const containerHeight = element.clientHeight;
  const centerPosition = scrollTop + containerHeight / 2;

  const allItems = Array.from(
    element.querySelectorAll('.time-option'),
  ) as HTMLElement[];

  if (allItems.length === 0) return -1;

  let closestItem: HTMLElement | null = null;
  let minDistance = Infinity;

  allItems.forEach((item) => {
    const itemCenter = item.offsetTop + TIME_ITEM_HEIGHT / 2;
    const distance = Math.abs(centerPosition - itemCenter);

    if (distance < minDistance) {
      minDistance = distance;
      closestItem = item;
    }
  });

  return closestItem ? allItems.indexOf(closestItem) : -1;
};

export const hasTimeUnit = (unit: TimeUnit, actualFormat: string) => {
  switch (unit) {
    case 'hour':
      return actualFormat.includes('HH') || actualFormat.includes('hh');
    case 'minute':
      return actualFormat.includes('mm');
    case 'second':
      return actualFormat.includes('ss');
    case 'ampm':
      return actualFormat.includes('aa');
    default:
      return false;
  }
};

/**
 * Parses a time string in format "HH:mm:ss" and returns a Date object
 * @param timeString Time string in format "HH:mm:ss" or "HH:mm"
 * @returns Date object with the specified time (today's date)
 */
export const parseTimeString = (timeString: string | null): Date | null => {
  if (!timeString) return null;

  const [hours = 0, minutes = 0, seconds = 0] = timeString
    .split(':')
    .map(Number);

  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(seconds);
  date.setMilliseconds(0);

  return date;
};
