export interface Book {
  id: number;
  title: string;
  added_at: string;
  time_to_read: string;
  text: string;
  cover: string;
  author: string;
}

export interface BookPart {
  id: number;
  title_part: string;
  text_part: string;
  part_number: number;
  page_count: number;
}

export interface Author {
  id: number;
  name: string;
  bio: string;
  photo: string;
}