export type ApplicationDetailsModel = {
  id: number;
  expertId: number;
  firstName: string | null;
  lastName: string | null;
  basicInfoComplete: boolean;
  submitted: boolean;
  categoryId: number | null;
  subCategoryIds: number[];

  timeZone: string | null;
  expectedAvgHrsPrWk: number | null;
  timesMostAvailable: string[];

  employmentCredential: EmploymentCredentialsModel | null;
  licenseCredential: LicenseCredentialsModel | null;
  businessCredential: BusinessCredentialsModel | null;
  influencerCredential: InfluencerCredentialsModel | null;

  additionalInfo: string | null;
  additionalSupportingDocuments: SupportingDocument[];
  newAdditionalSupportingDocuments: File[];
};

export type EmploymentCredentialsModel = {
  status: string | null;
  supportingDocuments: SupportingDocument[];
  networkingUrl: string | null;
  newSupportingDocuments: File[];
};

export type LicenseCredentialsModel = {
  type: string | null;
  supportingDocuments: SupportingDocument[];
  newSupportingDocuments: File[];
};

export type BusinessCredentialsModel = {
  name: string | null;
  supportingDocuments: SupportingDocument[];
  newSupportingDocuments: File[];
};

export type InfluencerCredentialsModel = {
  hasEnoughFollowers: boolean;
  instagramUrl: string | null;
  facebookUrl: string | null;
  linkedInUrl: string | null;
  youTubeUrl: string | null;
  twitchUrl: string | null;
  tikTokUrl: string | null;
  otherSocialUrl: string | null;
};

export type SupportingDocument = {
  downloadableFileId: number;
  fileName: string;
  url: string;
};
