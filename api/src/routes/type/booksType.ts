type BookRequestBody = {
  affiliate_link: string;
  volume_id: string;
  read_at: string;
};

type InsertBookBody = {
  volume_id: string;
  read_at: string;
  title: string;
  subtitle: string;
  authors: { name: string[] };
  published_date: string;
  page_count: number;
  categories: { category: string[] };
  affiliate_link: string;
  thumbnail: string;
};

export type { BookRequestBody, InsertBookBody };
