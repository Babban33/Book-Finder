interface Book {
    title: string;
    author_name?: string[];
    publisher?: string[];
    isbn?: string[];
    coverUrl?: string | null;
}
  
export default Book;