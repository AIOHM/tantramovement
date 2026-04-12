
export interface Workshop {
  id: string;
  title: string;
  description: string | null;
  date: string;
  end_date?: string | null;
  time: string | null;
  location: string | null;
  capacity: string | null;
  price: string | null;
  category: "workshop" | "retreat" | "training" | "massage";
  image_url?: string | null;
  highlights?: string[] | null;
  facilitator?: string | null;
  created_at?: string;
  updated_at?: string;
}
