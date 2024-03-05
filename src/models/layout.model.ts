interface Image {
  public_id: string;
  url: string;
  _id: string;
}

interface Banner {
  image: Image;
  title: string;
  subTitle: string;
}

interface Faq {
  _id: string;
  question: string;
  answer: string;
}

interface Category {
  _id: string;
  title: string;
}

export interface LayoutModel {
  _id: string;
  type: string;
  banner: Banner;
  faq: Faq[];
  categories: Category[];
  createdAt: string;
  updatedAt: string;
}
