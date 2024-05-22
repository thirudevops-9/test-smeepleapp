type Category = {
  id: number;
  name: string;
  description: string;
  smeRecruitingActive: boolean;
  consumerBookingActive: boolean;
  type: 'Main' | 'Sub';
  subcategories: Category[] | null;
  parentId: number | null;
  icon: string | null;
  image: string | null;
};

export default Category;
