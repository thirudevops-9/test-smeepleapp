import type {GridRenderCellParams, GridValueFormatterParams} from '@mui/x-data-grid';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {format, parseISO} from 'date-fns';

export const renderCheck =
  <T,>(testValue: T) =>
  (params: GridRenderCellParams<T>) => {
    if (params.value === testValue) {
      return <FontAwesomeIcon icon={faCheck} size="xs" />;
    }

    return '';
  };

export const formatDateTime = ({value}: GridValueFormatterParams<string | null>) => {
  if (value === null) {
    return '';
  }

  const date = parseISO(value);
  return format(date, 'M/d/yyyy k:mm:ss');
};
