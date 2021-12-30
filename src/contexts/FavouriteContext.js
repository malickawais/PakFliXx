import React, { createContext, useContext, useState } from "react";

export default function useFavorites() {
  return useContext(FavoriteContext);
}

const FavoriteContext = createContext({
  favorites: [],
  toggleFavorite: (object) => {},
});

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorites = (object) => {
    const foundIndex = favorites.findIndex((obj) => obj.id === object.id);

    if (foundIndex === -1) {
      setFavorites([...favorites, object]); // adding object to favorites
    } else {
      setFavorites(favorites.filter((obj) => obj.id !== object.id));
    }
  };

  const value = {
    favorites,
    toggleFavorites,
  };

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
};
