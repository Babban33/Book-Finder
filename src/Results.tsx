import { useState } from 'react';
import Book from "./components/Types";

interface ResultsProps {
  searchResults: Book[] | null;
}

function Results({ searchResults }: ResultsProps) {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleMoreDetailsClick = (book: Book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  return (
    <div className="mt-8 max-w-5xl mx-auto">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Search Results:</h3>
      {searchResults ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {searchResults.map((book, index) => (
            <li key={index} className="p-4 border border-gray-200 rounded-lg shadow-md bg-white">
              {book.coverUrl ? (
                <img
                  src={book.coverUrl}
                  alt={`Cover of ${book.title}`}
                  className="mb-4 w-full h-60 object-contain rounded-md"
                />
              ) : (
                <div className="mb-4 w-full h-60 flex items-center justify-center border-2 border-dotted border-gray-300 text-gray-400 rounded-md">
                  No Cover Photo
                </div>
              )}
              <h4 className="font-bold text-lg text-gray-800 truncate">{book.title}</h4>
              <p className="text-gray-600 truncate">By {book.author_name?.join(', ') || 'Unknown'}</p>
              <button
                onClick={() => handleMoreDetailsClick(book)}
                className="mt-4 text-gray-600 underline"
              >
                More Details
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
      
      {selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-11/12 max-w-lg p-6 rounded-lg shadow-lg relative max-h-[80vh] flex flex-col">
            <div className="flex-grow overflow-y-auto">
              {selectedBook.coverUrl ? (
                  <img
                    src={selectedBook.coverUrl}
                    alt={`Cover of ${selectedBook.title}`}
                    className="w-full object-cover rounded-md mb-4"
                  />
                ) : (
                  <div className="w-full h-60 flex items-center justify-center border-2 border-dotted border-gray-300 text-gray-400 rounded-md mb-4">
                    No Cover Photo
                  </div>
                )}
                <h4 className="text-2xl font-bold text-gray-800 mb-2">{selectedBook.title}</h4>
                <p className="text-gray-600 mb-2">Author(s): {selectedBook.author_name?.join(', ') || 'Unknown'}</p>
                <p className="text-gray-500 mb-2">Publisher(s): {selectedBook.publisher?.join(', ') || 'Unknown'}</p>
                <p className="text-gray-500">ISBN(s): {selectedBook.isbn?.join(', ') || 'N/A'}</p>
            </div>
            <button
              onClick={handleCloseModal}
              className="self-center mt-4 px-6 py-2 text-white bg-[#f18e7d] rounded-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Results;