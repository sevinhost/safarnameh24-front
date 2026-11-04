type Hotel = {
  address: string;
  average_score: number;
  city: {
    id: number;
    image: string;
    name: string;
    province: string;
    slug: string;
    hotels_number: number;
    show_in_homepage: boolean;
  };
  comment_count: number;
  discount_date: string | null;
  discount_percentage: number | null;
  main_image: string;
  name: string;
  price_after_discount: number;
  public_tags: { id: number; title: string }[];
  rating: number;
  night_count: number;
  reservation_count: number;
  slug: string;
  stars: number;
  price: number;
  type: string;
};

export type { Hotel };
