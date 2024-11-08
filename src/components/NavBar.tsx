import Logo from '../assets/logo.png';

function NavBar() {
  return (
    <header className="bg-white">
      <div className='shadow-md py-4 px-6 mb-1'>
        <div className="container mx-auto flex justify-between items-center max-w-screen-lg">
          <div className="flex items-center space-x-3">
            <img src={Logo} alt="Logo" className="h-10 w-10" />
            <div>
              <span className="text-2xl font-bold text-gray-800">BookChoix</span>
            </div>
          </div>
          <button className="bg-black p-2 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" className="text-white" strokeLinejoin="round" d="M21 21l-5.197-5.197M15.803 15.803A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export default NavBar;