import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTrailerPopup, setShowTrailerPopup] = useState(false);
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const url = `https://yts.mx/api/v2/movie_details.json?movie_id=${movieId}&with_images=true&with_cast=true`;

      try {
        const response = await axios.get(url);
        setMovie(response.data.data.movie);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const openTrailerPopup = () => {
    setShowTrailerPopup(true);
  };

  const closeTrailerPopup = () => {
    setShowTrailerPopup(false);
  };

  const openDownloadPopup = () => {
    setShowDownloadPopup(true);
  };

  const closeDownloadPopup = () => {
    setShowDownloadPopup(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${movie.background_image})` }}
      ></div>
      <div className="relative z-10 bg-gray-900 bg-opacity-75 min-h-screen">
        <div className="container mx-auto py-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row justify-between">
              <div className="w-full md:w-2/3">
                <div className="flex justify-center items-center mb-8">
                  <img
                    src={movie.large_cover_image}
                    alt={movie.title}
                    className="rounded-lg shadow-xl w-full md:w-72 lg:w-96"
                  />
                </div>
                <div className="text-center mb-8">
                  <h1 className="text-4xl font-semibold text-white mb-2">
                    {movie.title}
                  </h1>
                  <p className="text-gray-300">{movie.description_full}</p>
                </div>
                <hr className="my-8" />
              </div>
              <div className="w-full md:w-1/3">
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="flex justify-between text-gray-400 mb-4">
                      <div>
                        <p>Rating: {movie.rating}</p>
                        <p>Year: {movie.year}</p>
                        <p>Runtime: {movie.runtime} mins</p>
                        <p>Genres: {movie.genres.join(", ")}</p>
                        <p>Language: {movie.language}</p>
                        <p>Download Count: {movie.download_count}</p>
                        <p>Like Count: {movie.like_count}</p>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-2xl font-semibold text-white mb-4">
                        Cast
                      </h2>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {movie.cast.map((castMember) => (
                          <div
                            key={castMember.imdb_code}
                            className="text-center"
                          >
                            <img
                              src={castMember.url_small_image}
                              alt={castMember.name}
                              className="rounded-full w-24 mx-auto mb-2"
                            />
                            <p className="text-gray-300">{castMember.name}</p>
                            <p className="text-gray-400">
                              {castMember.character_name}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-center mt-8 pt-8">
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg focus:outline-none"
                        onClick={openTrailerPopup}
                      >
                        Watch Trailer
                      </button>
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg ml-4 focus:outline-none"
                        onClick={openDownloadPopup}
                      >
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Popups */}
      {showTrailerPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          <div className="bg-white w-full sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12 rounded-lg">
            <div className="modal-header flex justify-between items-center px-4 py-3 bg-gray-200 rounded-t-lg">
              <h5 className="modal-title text-lg font-medium">Trailer</h5>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700"
                onClick={closeTrailerPopup}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body p-4 flex justify-center">
              <div className="relative pb-9/16">
                <iframe
                  width="700"
                  height="400"
                  className="embed-responsive-item"
                  src={`https://www.youtube.com/embed/${movie.yt_trailer_code}`}
                  title="Movie Trailer"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      {showDownloadPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          <div className="bg-white w-full sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12 rounded-lg">
            <div className="modal-header flex justify-between items-center px-4 py-3 bg-gray-200 rounded-t-lg">
              <h5 className="modal-title text-lg font-medium">
                Download Torrent
              </h5>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700"
                onClick={closeDownloadPopup}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body flex flex-wrap justify-around p-4">
              {movie.torrents.map((torrent, index) => (
                <div key={torrent.size} className="flex items-center mb-4 p-3">
                  <p className="font-semibold mr-2">
                    Quality: {torrent.quality} ({torrent.type})
                  </p>
                  <p className="font-semibold mr-2">Size: {torrent.size}</p>
                  <a
                    href={torrent.url}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download
                  </a>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MovieDetails;
