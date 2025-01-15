import { Book, BookPart, Author } from '../types/book';

export const mockBooks: Book[] = [
  {
    title: "The Art of Programming",
    added_at: "2024-03-15T10:00:00Z",
    time_to_read: "15 min",
    text: "Chapter 1: Introduction to Programming...",
    cover: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop",
    author: "John Smith"
  },
  {
    title: "Digital Design Principles",
    added_at: "2024-03-14T15:30:00Z",
    time_to_read: "20 min",
    text: "Understanding the fundamentals of design...",
    cover: "https://images.unsplash.com/photo-1555066931-bf19f8fd1085?w=800&auto=format&fit=crop",
    author: "Emma Wilson"
  },
  {
    title: "Modern Architecture",
    added_at: "2024-03-13T09:15:00Z",
    time_to_read: "25 min",
    text: "Exploring contemporary architectural trends...",
    cover: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&auto=format&fit=crop",
    author: "Michael Brown"
  }
];

export const mockBookSeries: Record<string, BookPart[]> = {
  "0": [
    {
      id: "1",
      title: "Getting Started with Programming",
      text: "In this first chapter, we'll explore the basics of programming...",
      part_number: 1
    },
    {
      id: "2",
      title: "Variables and Data Types",
      text: "Understanding different types of data and how to store them...",
      part_number: 2
    },
    {
      id: "3",
      title: "Control Structures",
      text: "Learning about loops and conditional statements...",
      part_number: 3
    }
  ]
};

export const mockAuthors: Record<string, Author[]> = {
  "0": [
    {
      id: "1",
      name: "John Smith",
      bio: "A seasoned programmer with 15 years of experience in software development.",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop"
    },
    {
      id: "2",
      name: "Sarah Johnson",
      bio: "Technical editor and programming instructor at leading universities.",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop"
    }
  ]
};