import DetailsPage from "./views/MovieDetails/MovieDetails";

import { BrowserRouter, Link, Outlet, useRoutes } from "react-router-dom";
import Signup from "./components/Auth/Signup/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import NavBar from "./components/Common/NavBar/NavBar";
import Login from "./components/Auth/Login/Login";
import ForgetPassword from "./components/Auth/ForgetPassword/ForgetPassword";
import TvShowLanding from "./views/TvShow/TvShowList";
import { FavoriteProvider } from "./contexts/FavouriteContext";
import Account from "./views/Account/Account";
import FavouriteList from "./views/Favourites/FavouriteList";
import MovieList from "./views//Movie/MovieList";
import ActorList from "./views/Actor/ActorList";
import Profile from "./components/Profile/Profile";
import GenreList from "./views/Genres/GenreList";
import ModalPage from "./components/Modal/Modal";
import TvSerialDetailCard from "./components/DetailPage/TvDetailsPageCard";

const App = () => {
  const routes = useRoutes([
    { path: "/", element: <Login /> },
    { path: "Login", element: <Login /> },

    { path: "Signup", element: <Signup /> },
    { path: "movies", element: <MovieList /> },
    { path: "movies/:movieId", element: <DetailsPage /> },
    { path: "serial/:serialId", element: <TvSerialDetailCard /> },

    { path: "ForgetPassword", element: <ForgetPassword /> },
    { path: "tv", element: <TvShowLanding /> },
    { path: "account", element: <Account /> },
    { path: "account/favorites", element: <FavouriteList /> },
    { path: "favorites", element: <FavouriteList /> },

    { path: "actors", element: <ActorList /> },
    { path: "account/profile", element: <Profile /> },
    { path: "genres", element: <GenreList /> },
    { path: "modal", element: <ModalPage /> },
  ]);
  return (
    <AuthProvider>
      <FavoriteProvider>
        <NavBar />
        {routes}
      </FavoriteProvider>
    </AuthProvider>
  );
};

export default App;
