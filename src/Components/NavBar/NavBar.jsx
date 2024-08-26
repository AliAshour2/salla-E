import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/cart.png";
import styles from "./NavBar.module.css";
import { TokenContext } from "../../Context/TokenContext";
import { cartContext } from "../../Context/cartContext";
import { wishlistContext } from "../../Context/wishlist";

function NavBar() {
  const { token, setToken } = useContext(TokenContext);
  const { numCartItems } = useContext(cartContext);
  const { wishlistItemsCount } = useContext(wishlistContext);
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("userToken");
    setToken(null);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container">
        <Link className="navbar-brand fs-3" to="/">
          <img className="w-25" src={logo} alt="Salla Logo" /> Salla
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {token && (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {["Home", "Products"].map((text) => (
                <li className="nav-item" key={text}>
                  <Link className="nav-link active" aria-current="page" to={`/${text.toLowerCase()}`}>
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {token ? (
              <>
                <NavItem
                  to="/wishlist"
                  iconClass="fa-regular fa-heart"
                  badgeCount={wishlistItemsCount}
                />
                <NavItem
                  to="/cart"
                  iconClass="bi bi-bag"
                  badgeCount={numCartItems}
                />
                <li className="nav-item ">
                  <button onClick={logOut} className={`nav-link ${styles.Btn}`}>
                    <div className={styles.sign}>
                      <svg viewBox="0 0 512 512">
                        <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                      </svg>
                    </div>
                    <div className={styles.text}>Logout</div>
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

const NavItem = ({ to, iconClass, badgeCount }) => (
  <li className="nav-item">
    <Link className="nav-link position-relative" to={to}>
      <i className={`text-muted  ${iconClass} fs-4`}></i>
      <span className="position-absolute small top-8 start-75 translate-middle badge rounded-pill bg-success">
        {badgeCount}
      </span>
    </Link>
  </li>
);

export default NavBar;
