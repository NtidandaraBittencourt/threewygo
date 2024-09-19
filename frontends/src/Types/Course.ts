import { Video } from './Video';

export interface Course {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  videos: Video[];
}
