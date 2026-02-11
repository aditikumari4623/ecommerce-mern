import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingBag, FaUser, FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import "./Header.css";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* TOP BAR */}
      <header className="topbar">
        <span className="brand">ECOMMERCE</span>
        <FaBars className="burger" onClick={() => setOpen(true)} />
      </header>

      {/* OVERLAY NAVBAR */}
      {open && (
        <div className="overlay-nav">
          {/* LEFT */}
          <div className="overlay-left">
            <IoClose className="close" onClick={() => setOpen(false)} />
            <span className="brand">ECOMMERCE</span>
          </div>

          {/* CENTER */}
          <nav className="overlay-center">
            <Link to="/" onClick={() => setOpen(false)}>Home</Link>
            <Link to="/products" onClick={() => setOpen(false)}>Products</Link>
            <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
            <Link to="/about" onClick={() => setOpen(false)}>About</Link>
          </nav>

          {/* RIGHT */}
          <div className="overlay-right">
            <Link to="/search" onClick={() => setOpen(false)}>
              <FaSearch />
            </Link>

            <Link to="/cart" onClick={() => setOpen(false)}>
              <FaShoppingBag />
            </Link>

            <Link to="/login" onClick={() => setOpen(false)}>
              <FaUser />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
