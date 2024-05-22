export type ExpertTipsModel = {
  id: number;
  tips: ExpertTipModel[];
};

export type ExpertTipModel = {
  id: number | null;
  tip: string;
};
