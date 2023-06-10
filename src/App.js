import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MovieList from './MovieList';
import MovieDetails from './MovieDetails';
function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movies/:movieId" element={<MovieDetails />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
