import {z} from 'zod';
// eslint-disable-next-line no-restricted-imports
import * as Yup from 'yup';

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === z.ZodIssueCode.too_big) {
    return {message: `Can be at most ${issue.maximum} characters`};
  }

  if (issue.code === z.ZodIssueCode.too_small) {
    if (issue.minimum === 1 && ctx.data === '') {
      return {message: 'Required'};
    }

    return {message: `Must be at least ${issue.minimum} characters`};
  }

  return {message: ctx.defaultError};
};

z.setErrorMap(customErrorMap);

// see https://github.com/jquense/yup/issues/293
Yup.setLocale({
  string: {
    max: '${label} can be at most ${max} characters',
    min: '${label} must be at least ${min} characters',
  },
});

export default Yup;
