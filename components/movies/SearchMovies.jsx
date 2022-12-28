import { useContext, useRef } from 'react';
import styled from 'styled-components';
import { API_URL_SEARCH } from '../../contants/movieContants';
import MoviesContext from '../../contexts/MoviesContext';

const SearchMoviesStyled = styled.div`
    header {
        background-color: #373b69;
        display: flex;
        justify-content: center;
        padding: 1.5rem;
        margin-bottom: 100px;
        position: fixed;
        z-index: 1;
        width: 100%;
    }

    .search {
        background-color: transparent;
        border: 2px solid #22254b;
        border-radius: 50px;
        color: #eee;
        font-family: inherit;
        font-family: 1rem;
        padding: 0.5rem 1rem;
        width: 300px;
    }

    .search::placeholder {
        color: #eee;
    }

    .search:focus {
        background-color: #22254b;
        outline: none;
    }
`;

function SearchMovies() {
    const inputRef = useRef('');
    const moviesContext = useContext(MoviesContext);
    const {searchInfo} = moviesContext;
    const handleSubmit = e => {
        e.preventDefault();
        const searchTerm = inputRef.current.value;

        if (searchTerm) {
            searchInfo(`${API_URL_SEARCH}${searchTerm}`);
            search.value = '';
        }
    }
  return (
    <SearchMoviesStyled>
        <header>
            <form id="form" onSubmit={e => handleSubmit(e)}>
                <input ref={inputRef} type="text" id="search" placeholder="Search" className="search"/>
            </form>
        </header>
    </SearchMoviesStyled>
  )
}

export default SearchMovies;