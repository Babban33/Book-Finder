import { useState, ChangeEvent, FormEvent } from 'react';
import Book from './Types';

interface BookFormProps {
  onSearch: (results: Book[] | null) => void;
}

function BookForm({ onSearch }: BookFormProps) {
  const [formData, setFormData] = useState({
    bookTitle: '',
    author: '',
    isbn: '',
    publisher: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.bookTitle && !formData.author && !formData.isbn && !formData.publisher) {
      setError('At least one field is required.');
    } else {
      setError('');
      setLoading(true);
      const lowerCaseFormData = {
        bookTitle: formData.bookTitle.toLowerCase().split(' ').join('+'),
        author: formData.author.toLowerCase().split(' ').join('+'),
        isbn: formData.isbn.toLowerCase().split(' ').join('+'),
        publisher: formData.publisher.toLowerCase().split(' ').join('+')
      };
    
      const queryParams = [];
      if (lowerCaseFormData.bookTitle) queryParams.push(`title=${lowerCaseFormData.bookTitle}`);
      if (lowerCaseFormData.author) queryParams.push(`author=${lowerCaseFormData.author}`);
      if (lowerCaseFormData.isbn) queryParams.push(`isbn=${lowerCaseFormData.isbn}`);
      if (lowerCaseFormData.publisher) queryParams.push(`publisher=${lowerCaseFormData.publisher}`);

      const queryString = queryParams.join('&');

      try {
        const response = await fetch(`https://openlibrary.org/search.json?${queryString}`);
        if (!response.ok) {
          throw new Error('Server is unavailable. Please try again later.');
        }
        const data = await response.json();

        const booksWithCovers = data.docs.map((book: Book) => {
          const coverId = book.cover_i;
          const coverUrl = coverId ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg` : null;
          return { ...book, coverUrl };
        });

        onSearch(booksWithCovers);
      } catch (error) {
        console.log(error);
        setError('Server is unavailable. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">Search for a PDF Book</h2>
      <p className="text-center text-gray-600 mb-6">
        Only one field is required. Multiple fields yield better results.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500 text-center font-medium">{error}</p>}
        {loading && <p className="text-blue-500 text-center font-medium">Please wait...</p>} {/* Loading message */}

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="bookTitle" className="block text-gray-700 font-medium">Book Title</label>
            <input
              id="bookTitle"
              type="text"
              value={formData.bookTitle}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f18e7d]"
              placeholder="Enter book title"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="author" className="block text-gray-700 font-medium">Author</label>
            <input
              id="author"
              type="text"
              value={formData.author}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f18e7d]"
              placeholder="Enter author's name"
            />
          </div>
        </div>
        <div>
          <label htmlFor="isbn" className="block text-gray-700 font-medium">ISBN Number</label>
          <input
            id="isbn"
            type="text"
            value={formData.isbn}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f18e7d]"
            placeholder="Enter ISBN number"
          />
        </div>
        <div>
          <label htmlFor="publisher" className="block text-gray-700 font-medium">Publisher</label>
          <input
            id="publisher"
            type="text"
            value={formData.publisher}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f18e7d]"
            placeholder="Enter publisher's name"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-[#f18e7d] text-white py-3 rounded-md hover:bg-red-600 font-semibold"
          >
            Search Book
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookForm;