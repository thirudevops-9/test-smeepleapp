export type ExpertGalleryModel = {
  expertId: number;
  /** Urls */
  images: Image[];
};

type Image = {
  expertGalleryImageId: number;
  url: string;
};
