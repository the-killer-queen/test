export type Tag = {
  name: string;
  icon?: string;
};

export type MenuIngredient = {
  name: string;
  quantity?: string;
};

export type MenuItem = {
  id: number;
  name: string;
  price: number;
  ingredients?: MenuIngredient[];
  image_url?: string;
  tag?: Tag;
  created_at: string;
  updated_at: string;
};

export type MenuType = MenuItem[];

export type SortOptionValue =
  | 'created_at-desc'
  | 'created_at-asc'
  | 'name-asc'
  | 'name-desc'
  | 'price-desc'
  | 'price-asc';

export type SortField = 'created_at' | 'name' | 'price';

export type SortDirection = 'asc' | 'desc';
