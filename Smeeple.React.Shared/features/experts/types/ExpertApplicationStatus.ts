export enum ExpertApplicationStatus {
  Incomplete = 'Incomplete',
  Submitted = 'Submitted',
  ApprovedPublic = 'ApprovedPublic',
  ApprovedPrivate = 'ApprovedPrivate',
  Rejected = 'Rejected',
  Suspended = 'Suspended',
}

export const ApprovedExpertApplicationStatuses = [
  ExpertApplicationStatus.ApprovedPrivate,
  ExpertApplicationStatus.ApprovedPublic,
];
