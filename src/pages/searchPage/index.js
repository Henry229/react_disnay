import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import './searchPage.css';
import { useDebounce } from '../../hooks/useDebounce';

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  const searchTerm = query.get('q');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchSearchMovie(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const fetchSearchMovie = async (searchTerm) => {
    try {
      const response = await axios.get(
        `/search/multi?include_adult=false&query=${searchTerm}`
      );
      setSearchResults(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  if (searchResults.length > 0) {
    return (
      <section className='search-container'>
        {searchResults.map((movie) => {
          if (movie.backdrop_path !== null && movie.media_type !== 'person') {
            const movieImageUrl =
              'https://image.tmdb.org/t/p/w500' + movie.backdrop_path;
            return (
              <div className='movie' key={movie.id}>
                <div
                  className='movie__column-poster'
                  onClick={() => navigate(`/${movie.id}`)}
                >
                  <img
                    src={movieImageUrl}
                    alt='movie'
                    className='movie__poster'
                  />
                </div>
              </div>
            );
          }
          return null; // Add this line to return a value at the end of the arrow function
        })}
      </section>
    );
  } else {
    return (
      <section className='no-result'>
        <div className='no-results__text'>
          <p>찾고자 하는 검색어 '{searchTerm}'이 없습니다. '</p>
        </div>
      </section>
    );
  }
}
