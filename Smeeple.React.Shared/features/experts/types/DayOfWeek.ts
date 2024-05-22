/* eslint-disable import/prefer-default-export */

export enum DayOfWeek {
  Sunday = 'Sunday',
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
}

export const DAY_OF_WEEK_NUMBER: Record<DayOfWeek, 0 | 1 | 2 | 3 | 4 | 5 | 6> = {
  [DayOfWeek.Sunday]: 0,
  [DayOfWeek.Monday]: 1,
  [DayOfWeek.Tuesday]: 2,
  [DayOfWeek.Wednesday]: 3,
  [DayOfWeek.Thursday]: 4,
  [DayOfWeek.Friday]: 5,
  [DayOfWeek.Saturday]: 6,
};

export const DAY_OF_WEEK_SHORT_LABEL: Record<DayOfWeek, string> = {
  [DayOfWeek.Sunday]: 'Sun',
  [DayOfWeek.Monday]: 'Mon',
  [DayOfWeek.Tuesday]: 'Tue',
  [DayOfWeek.Wednesday]: 'Wed',
  [DayOfWeek.Thursday]: 'Thu',
  [DayOfWeek.Friday]: 'Fri',
  [DayOfWeek.Saturday]: 'Sat',
};
