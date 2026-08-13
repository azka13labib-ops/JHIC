export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  image_path?: string;
  is_active: boolean;
  department: string;
  category?: {
    id: number;
    name: string;
  };
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
}

export interface Achievement {
  id: number;
  title: string;
  description?: string;
  level: 'sekolah' | 'kota' | 'provinsi' | 'nasional' | 'internasional';
  year: string | number;
  image_path?: string;
}

export interface Vacancy {
  id: number;
  title: string;
  slug: string;
  type: 'pkl' | 'full_time' | 'part_time';
  description: string;
  requirements: string;
  deadline?: string;
  is_active: boolean;
  company?: {
    id: number;
    name: string;
    logo_url?: string;
    location?: string;
    website?: string;
    description?: string;
  };
}

export interface Company {
  id: number;
  name: string;
  logo_url?: string;
  location?: string;
  website?: string;
  description?: string;
  industry?: string;
}

export interface Registration {
  id: number;
  registration_number: string;
  full_name: string;
  nisn: string;
  date_of_birth: string;
  gender: 'L' | 'P';
  address: string;
  previous_school: string;
  major_choice: string;
  status: 'pending' | 'verified' | 'accepted' | 'rejected';
  phone?: string;
  email?: string;
  parent_name?: string;
  parent_phone?: string;
  notes?: string;
  created_at: string;
}

export interface PpdbInfo {
  registration_start?: string;
  registration_end?: string;
  announcement_date?: string;
  requirements?: string[];
  tracks?: string[];
}
