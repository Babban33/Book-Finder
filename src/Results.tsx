import { useState } from 'react';
import Book from "./components/Types";

interface ResultsProps {
  searchResults: Book[] | null;
}

function Results({ searchResults }: ResultsProps) {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showFullList, setShowFullList] = useState<{ authors: boolean; publishers: boolean; isbns: boolean }>({
    authors: false,
    publishers: false,
    isbns: false,
  });

  const handleMoreDetailsClick = (book: Book) => {
    setSelectedBook(book);
    setShowFullList({ authors: false, publishers: false, isbns: false });
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  const toggleShowMore = (type: 'authors' | 'publishers' | 'isbns') => {
    setShowFullList((prev) => ({ ...prev, [type]: !prev[type] }));
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
          <div className="bg-white w-11/12 lg:w-3/4 p-6 rounded-lg shadow-lg relative max-h-[80vh] flex flex-col lg:flex-row">
            <div className="lg:flex-shrink-0 lg:w-1/3 flex justify-center items-center">
              {selectedBook.coverUrl ? (
                <img
                  src={selectedBook.coverUrl}
                  alt={`Cover of ${selectedBook.title}`}
                  className="w-full object-contain rounded-md mb-4 lg:mb-0"
                />
              ) : (
                <div className="w-full h-60 flex items-center justify-center border-2 border-dotted border-gray-300 text-gray-400 rounded-md mb-4 lg:mb-0">
                  No Cover Photo
                </div>
              )}
            </div>
            <div className="lg:flex-grow lg:w-2/3 lg:pl-6 overflow-y-auto">
              <h4 className="text-2xl font-bold text-gray-800 mb-2">{selectedBook.title}</h4>

              <p className="text-gray-600 mb-2">
                Author(s):{" "}
                {selectedBook.author_name && selectedBook.author_name.length > 5 && !showFullList.authors
                  ? selectedBook.author_name.slice(0, 5).join(', ') + '...'
                  : selectedBook.author_name?.join(', ') || 'Unknown'}
                {selectedBook.author_name && selectedBook.author_name.length > 5 && (
                  <button
                    onClick={() => toggleShowMore('authors')}
                    className="text-blue-500 ml-1"
                  >
                    {showFullList.authors ? 'Show Less' : 'Show More'}
                  </button>
                )}
              </p>

              <p className="text-gray-500 mb-2">
                Publisher(s):{" "}
                {selectedBook.publisher && selectedBook.publisher.length > 5 && !showFullList.publishers
                  ? selectedBook.publisher.slice(0, 5).join(', ') + '...'
                  : selectedBook.publisher?.join(', ') || 'Unknown'}
                {selectedBook.publisher && selectedBook.publisher.length > 5 && (
                  <button
                    onClick={() => toggleShowMore('publishers')}
                    className="text-blue-500 ml-1"
                  >
                    {showFullList.publishers ? 'Show Less' : 'Show More'}
                  </button>
                )}
              </p>

              <p className="text-gray-500">
                ISBN(s):{" "}
                {selectedBook.isbn && selectedBook.isbn.length > 5 && !showFullList.isbns
                  ? selectedBook.isbn.slice(0, 5).join(', ') + '...'
                  : selectedBook.isbn?.join(', ') || 'N/A'}
                {selectedBook.isbn && selectedBook.isbn.length > 5 && (
                  <button
                    onClick={() => toggleShowMore('isbns')}
                    className="text-blue-500 ml-1"
                  >
                    {showFullList.isbns ? 'Show Less' : 'Show More'}
                  </button>
                )}
              </p>
            </div>
            <button
              onClick={handleCloseModal}
              className="self-center mt-4 px-6 py-2 text-white bg-[#f18e7d] rounded-sm lg:self-end lg:mt-0 lg:ml-6"
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