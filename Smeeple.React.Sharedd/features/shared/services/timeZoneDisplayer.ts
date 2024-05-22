/* eslint-disable import/prefer-default-export */

export const getUserFriendlyIANATimeZoneName = (ianaTimeZone: string) =>
  ianaTimeZone.replaceAll('_', ' ').replaceAll('/', ' / ');

export const getTimeZoneName = (ianaTimeZone: string) => {
  let name = 'Unknown';
  try {
    name =
      new Intl.DateTimeFormat('default', {
        timeZone: ianaTimeZone,
        timeZoneName: 'long',
      })
        ?.formatToParts()
        ?.find(({type}) => type === 'timeZoneName')?.value || '[Unknown Time Zone]';
  } catch {
    name = ianaTimeZone;
  }
  return name;
};
