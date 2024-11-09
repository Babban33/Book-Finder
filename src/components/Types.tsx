interface Book {
    title: string;
    author_name?: string[];
    publisher?: string[];
    isbn?: string[];
    cover_i?: number;
    coverUrl?: string | null;
}
  
export default Book;