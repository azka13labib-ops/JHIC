export interface SchoolProfile {
  id: number;
  name: string;
  description: string;
  vision: string;
  mission: string;
  address: string;
  email: string;
  phone: string;
  principal_name: string;
  principal_message: string;
}

export interface Achievement {
  id: number;
  title: string;
  description?: string;
  level: string;
  date?: string;
  year?: string | number;
  student_name?: string;
  image_path?: string;
}

export interface Department {
  id: number;
  name: string;
  description: string;
  icon?: string;
}

export interface Partner {
  id: number;
  name: string;
  logo_url: string;
}

export interface News {
  id: number;
  title: string;
  slug: string;
  content: string;
  published_at: string;
  image_url?: string;
}
