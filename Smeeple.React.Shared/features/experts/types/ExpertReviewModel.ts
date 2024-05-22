export type ExpertReviewListResponse = {
  items: ExpertReviewModel[];
  page: number;
  pageSize: number;
  nextPageCursor: number | undefined;
};

export type ExpertReviewModel = {
  id: number;
  dateCreated: string;
  reviewerFirstName: string;
  reviewerLastName: string;
  rating: number;
  title: string;
  message: string;
};
