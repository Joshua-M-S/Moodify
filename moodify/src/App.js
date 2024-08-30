import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import MainPage from './pages/mainPage'; // Adjust the import path if needed
import theme from './Themes/Theme';
import GenrePage from './pages/genrePage';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Bubbles from './Components/genreSelector';
import SubGenres from './Components/subgenreSelector';
import { SelectedGenresProvider } from './context/selectedGenresContext';

const App = () => {
  return (
    <SelectedGenresProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Bubbles />} />
        <Route path="/home" element={<MainPage />} />
        <Route path="/sub-genres/:genre" element={<SubGenres />} />
      </Routes>
    </Router>
    </SelectedGenresProvider>
  );
};
export default App;
