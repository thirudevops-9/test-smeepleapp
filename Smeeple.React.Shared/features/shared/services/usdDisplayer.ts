/* eslint-disable import/prefer-default-export */

export const getUsdDisplay = (usd: number) => {
  const formatterWithCents = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  const formatterWithoutCents = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  return usd % 1 !== 0 ? formatterWithCents.format(usd) : formatterWithoutCents.format(usd);
};
