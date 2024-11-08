import { useState, ChangeEvent, FormEvent } from 'react';
interface Book {
    title: string;
    author_name?: string[];
    publisher?: string[];
    isbn?: string[];
}

function BookForm() {
    const [formData, setFormData] = useState({
        bookTitle: '',
        author: '',
        isbn: '',
        publisher: ''
    });
    const [error, setError] = useState('');
    const [searchResults, setSearchResults] = useState<Book[] | null>(null);

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

            // Convert all input values to lowercase
            const lowerCaseFormData = {
                bookTitle: formData.bookTitle.toLowerCase(),
                author: formData.author.toLowerCase(),
                isbn: formData.isbn.toLowerCase(),
                publisher: formData.publisher.toLowerCase()
            };

            // Construct the query string based on filled fields
            const queryParams = [];
            if (lowerCaseFormData.bookTitle) queryParams.push(`title=${encodeURIComponent(lowerCaseFormData.bookTitle)}`);
            if (lowerCaseFormData.author) queryParams.push(`author=${encodeURIComponent(lowerCaseFormData.author)}`);
            if (lowerCaseFormData.isbn) queryParams.push(`isbn=${encodeURIComponent(lowerCaseFormData.isbn)}`);
            if (lowerCaseFormData.publisher) queryParams.push(`publisher=${encodeURIComponent(lowerCaseFormData.publisher)}`);

            const queryString = queryParams.join('&');

            // Fetch data from Open Library Search API
            const response = await fetch(`https://openlibrary.org/search.json?${queryString}`);
            const data = await response.json();
            console.log(data);
            // Set search results
            setSearchResults(data.docs);
            console.log("Search results:", data.docs);
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">Search for a PDF Book</h2>
            <p className="text-center text-gray-600 mb-6">
                Only one field is required. Multiple fields yield better results.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Display error message */}
                {error && <p className="text-red-500 text-center font-medium">{error}</p>}

                {/* Row for Book Title and Author */}
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Book Title */}
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

                    {/* Author */}
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

                {/* ISBN Number */}
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

                {/* Publisher */}
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

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full bg-[#f18e7d] text-white py-3 rounded-md hover:bg-red-600 font-semibold"
                    >
                        Search Book
                    </button>
                </div>
            </form>

            {/* Display Search Results */}
            {searchResults && (
                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Search Results:</h3>
                    <ul className="space-y-2">
                        {searchResults.map((book: Book, index: number) => (
                            <li key={index} className="p-4 border border-gray-300 rounded-md">
                                <h4 className="font-bold">{book.title}</h4>
                                <p>Author: {book.author_name?.join(', ')}</p>
                                <p>Publisher: {book.publisher?.join(', ')}</p>
                                <p>ISBN: {book.isbn?.join(', ')}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default BookForm;