import Logo from '../assets/logo.png';
import './NavBar.css';
function NavBar() {
  return (
    <header className="header">
      <div className="header-container">
        <img src={Logo} className="header-logo"/>
        <span className="header-title">Book Finder</span>
      </div>
    </header>
  );
}

export default NavBar;