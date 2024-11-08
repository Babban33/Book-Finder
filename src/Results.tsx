import Book from "./components/Types";

interface ResultsProps {
  searchResults: Book[] | null;
}

function Results({ searchResults }: ResultsProps) {
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
                  className="mb-4 w-full h-60 object-cover rounded-md"
                />
              ) : (
                <div className="mb-4 w-full h-60 flex items-center justify-center border-2 border-dotted border-gray-300 text-gray-400 rounded-md">
                  No Cover Photo
                </div>
              )}
              <h4 className="font-bold text-lg text-gray-800">{book.title}</h4>
              <p className="text-gray-600">By {book.author_name?.join(', ')}</p>
              <p className="text-sm text-gray-500">{book.publisher?.join(', ')}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

export default Results;