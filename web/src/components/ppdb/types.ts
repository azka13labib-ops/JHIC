export interface FormData {
  full_name: string;
  nisn: string;
  date_of_birth: string;
  gender: 'L' | 'P' | '';
  address: string;
  previous_school: string;
  major_choice?: string;
  phone: string;
  email: string;
  parent_name: string;
  parent_phone: string;
}

export interface PpdbInfo {
  is_open?: boolean;
  academic_year?: string;
  closed_message?: string;
}
