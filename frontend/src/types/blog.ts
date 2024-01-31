export type BlogCardProps = {
  data: BlogType[];
};

export type BlogType = {
  id: number;
  heading: string;
  body: string;
  created_at: string;
};

export type BlogData = {
  title: string;
  content: string;
};
