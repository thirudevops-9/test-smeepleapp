import type {DayOfWeek} from './DayOfWeek';
import type {ExpertApplicationStatus} from './ExpertApplicationStatus';
import type Gender from './Gender';

export type ExpertDetailsModel = {
  id: number;
  appointmentDurationRates: ExpertAppointmentDurationRateModel[];
  specialties: ExpertSpecialtyModel[];
  tips: ExpertTipsModel[];
  helpStatements: ExpertHelpStatementModel[];
  availabilities: ExpertAvailabilityModel[];

  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  categoryId: number | null;
  subCategoryIds: number[] | null;

  gender: Gender | null;
  languages: string[];
  location: string | null;
  state: string | null;
  biography: string | null;
  rating: number | null;
  totalReviews: number | null;

  facebookUrl: string | null;
  instagramUrl: string | null;
  linkedInUrl: string | null;
  twitchUrl: string | null;
  tikTokUrl: string | null;
  youTubeUrl: string | null;
  optedOutOfSocial: boolean | null;

  photoUrl: string | null;
  timeZone: string | null;

  applicationStatus: ExpertApplicationStatus;

  basicInfoComplete: boolean;
  stripeComplete: boolean;
  contentComplete: boolean;
  availabilityComplete: boolean;
  availabilityUpdatedAtTimestamp: string | null;

  agreesToLegal: boolean;
  meetsMinimumAge: boolean;
  isSuspended: boolean;
  isUserDisabled: boolean;

  profileLinkId: string;
};

export type ExpertSpecialtyModel = {
  id: number | null;
  specialty: string;
};

export type ExpertTipsModel = {
  id: number | null;
  tip: string;
};

export type ExpertHelpStatementModel = {
  id: number | null;
  helpStatement: string;
};

export type ExpertAppointmentDurationRateModel = {
  appointmentDurationId: number;
  durationMinutes: number;
  rate: number;
};

export type ExpertAvailabilityModel = {
  id: number | null;
  dayOfWeek: DayOfWeek;
  enabled: boolean;
  timeZone: string;
  /**
   * The number of minutes between midnight on dayOfWeek in timeZone time zone and the start of the period
   */
  startMinutes: number;
  /**
   * The number of minutes between midnight on dayOfWeek in timeZone time zone and the end of the period
   */
  endMinutes: number;
  exceptions: ExpertAvailabilityExceptionModel[];
};

export type ExpertAvailabilityExceptionModel = {
  id: number | null;
  date: string;
};
