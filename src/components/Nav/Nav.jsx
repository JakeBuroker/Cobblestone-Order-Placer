import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

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

      {!user.id ? (
        <Link style={{ marginLeft: '750px'}} className="navLink" to="/login">
          Login / Register
        </Link>
      ) : (
        <div style={{ marginLeft: '750px', display: 'flex', alignItems: 'center' }}>
          <Link className="navLink" to={`/user`} style={{ marginRight: '3px' }}>
            {user.username}
          </Link>
          <LogOutButton className="navLink" />
        </div>
      )}
    </div>
  );
}

export default Nav;