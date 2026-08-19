
export interface Achievement {
  id: number;
  title: string;
  description?: string;
  level: 'sekolah' | 'kota' | 'provinsi' | 'nasional' | 'internasional';
  year: string | number;
  image_path?: string;
}

