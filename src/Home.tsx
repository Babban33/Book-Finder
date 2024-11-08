import { useState } from 'react';
import Landing from './assets/home.png';
import BookForm from './components/BookForm';
import Results from './Results';
import Book from './components/Types';

function Home() {
  const [searchResults, setSearchResults] = useState<Book[] | null>(null);

  const handleSearchResults = (results: Book[] | null) => {
    setSearchResults(results);
  };

  return (
    <div className="bg-[#F8F9FA] p-8">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center lg:items-start text-left">
        <div className="lg:w-1/3">
          <div className="text-sm inline-block lg:text-md uppercase font-medium tracking-wide bg-[#f0eff1] text-[#121823] rounded-sm text-left px-4 py-1 lg:px-4 lg:py-1 mb-4 lg:leading-10">
            Embed PDF Feature
          </div>

          <h1 className="text-gray-900 font-bold leading-tight lg:text-6xl text-4xl lg:font-extrabold lg:tracking-tight">
            Search <span className="text-[#f18e7d]">PDF Books</span> Online
          </h1>

          <p className="mt-4 text-gray-600">
            Discover Your Next Great Read with Ease – Find and Enjoy Books Tailored to Your Interests
          </p>

          <button className="mt-6 bg-[#f18e7d] text-white font-semibold py-2 px-6 rounded-md hover:bg-red-600">
            Search Now
          </button>
        </div>

        <div className="mt-8 lg:mt-0 lg:ml-8 lg:w-2/3">
          <img
            src={Landing}
            alt="Person reading books online"
            className="w-full h-auto"
          />
        </div>
      </div>

      <div className="flex justify-center items-center mt-16">
        <BookForm onSearch={handleSearchResults} />
      </div>
      <Results searchResults={searchResults} />
    </div>
  );
}

export default Home;