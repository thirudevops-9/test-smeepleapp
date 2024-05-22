/* eslint-disable import/prefer-default-export */
import {intervalToDuration} from 'date-fns';

export const durationRateDurationDisplayer = (durationMinutes: number) => {
  const duration = intervalToDuration({start: 0, end: durationMinutes * 60 * 1000});
  const display: string[] = [];
  if (duration.hours) display.push(`${duration.hours} Hr`);
  if (duration.minutes) display.push(`${duration.minutes} Min`);
  return display.join(' ');
};
