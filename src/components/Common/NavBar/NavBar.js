import React from "react";
import { Container, Nav, Navbar, Button, Badge } from "react-bootstrap";
import { Link, NavLink, useResolvedPath, useMatch } from "react-router-dom";
import "./NavBar.css";
import useFavorites from "../../../contexts/FavouriteContext";

function CustomLink({ children, to, ...props }) {
  let resolved = useResolvedPath(to);
  console.log(resolved);
  let match = useMatch({ path: resolved.pathname, end: false });

  return (
    <Link
      className="mx-4 ss-navbar-link"
      style={{ textDecoration: match ? "underline" : "none" }}
      to={to}
      {...props}
    >
      {children}
    </Link>
  );
}

export default function NavBar({ user, onLogout }) {
  const { favorites, toggleFavorites } = useFavorites();

  return (
    <Navbar className="navbar-container" bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>
          <NavLink to="/">PakFliXx</NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="d-flex align-items-center justify-content-between w-100">
            <div>
              <CustomLink to="/movies">Movies</CustomLink>
              <CustomLink to="/tv">Tv</CustomLink>
              <CustomLink to="/actors">Actors</CustomLink>

              <CustomLink to="/genres">Genres</CustomLink>
              <CustomLink to="/account">Account</CustomLink>
              <CustomLink to="/favorites">
                Favourites
                {favorites.length > 0 && (
                  <Badge bg="primary">{favorites.length}</Badge>
                )}
              </CustomLink>
            </div>
            {/* <div>
              {user ? (
                <Button onClick={onLogout} className='ss-navbar-link'>
                  Logout
                </Button>
              ) : (
                <NavLink className='ss-navbar-link' to='/auth/login'>
                  Login
                </NavLink>
              )}
            </div> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
