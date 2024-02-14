import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';


function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Cobblestone Cafe</h2>
      </Link>

      <Link className="navLink" to="/">
        Home
      </Link>

      <Link className="navLink" to="/about">
        About
      </Link>

      <Link className="navLink" to="/menu">
        Menu
      </Link>

      <Link className="navLink" to="/contact">
        Contact
      </Link>

      <Link className="navLink" to="/order">
        Order Pickup
      </Link>

{/* If user is not logged in, show "Login / Register" link */}
      {!user.id ? (
        <Link className="navLink" to="/login">
          Login / Register
        </Link>
      ) : (
        // If user is logged in, display user's username and a logout button
        <div>
          <Link
            className="navLink"
            to={`/user`}
            style={{
              alignItems: "end",
              display: "flex-end",
              marginRight: "3px",
            }}
          >
            {user.username}
          </Link>
          <LogOutButton className="navLink" />
        </div>
      )}
    </div>
  );
}

export default Nav;