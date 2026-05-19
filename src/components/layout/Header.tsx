import { Link, NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          Hỏi Dân IT
        </Link>
        <nav className="header-nav">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/posts">Posts</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
