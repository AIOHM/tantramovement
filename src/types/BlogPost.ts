
export interface BlogPost {
  id: string;
  title: string;
  content: string | null;
  image_url: string | null;
  author: string | null;
  date: string | null;
  excerpt?: string | null;
  created_at?: string;
  updated_at?: string;
}
