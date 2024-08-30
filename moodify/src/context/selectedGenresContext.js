// src/context/selectedGenresContext.js

import React, { createContext, useState, useContext } from 'react';

const SelectedGenresContext = createContext();

export const SelectedGenresProvider = ({ children }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);

  const addGenre = (genre) => {
    if (!selectedGenres.includes(genre)) {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const removeGenre = (genre) => {
    setSelectedGenres(selectedGenres.filter(g => g !== genre));
  };

  return (
    <SelectedGenresContext.Provider value={{ selectedGenres, addGenre, removeGenre }}>
      {children}
    </SelectedGenresContext.Provider>
  );
};

export const useSelectedGenres = () => useContext(SelectedGenresContext);
