import {useQuery} from '@tanstack/react-query';
import {get} from '../../../util';
import type {AppointmentDurationModel} from '../types';

const QUERY_KEY = ['appointments', 'durations'];

export default function useAppointmentDurations() {
  return useQuery([QUERY_KEY], async () => {
    const {data} = await get<AppointmentDurationModel[]>('appointments/durations');
    return data;
  });
}
