import { lazy, useContext, useEffect } from 'react';
import { useImmer } from 'use-immer';
import { API_URL_NOW_PLAYING, API_URL_TOP_RATED } from '../../contants/movieContants';
import styled, { css } from 'styled-components';
import MoviesContext from '../../contexts/MoviesContext';
import { useRouter } from 'next/router';

const TabMovies = lazy(() => import('../tabs/TabMovies'));
const SkeletonCard = lazy(() => import('../skeleton/SkeletonCard'));
const ItemMovies = lazy(() => import('../movies/ItemMovies'));

const BarStyled = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  .flex-grid {
    opacity: 0.8;
  }

  img {
    display: inline-block;
    cursor: pointer;
  }

  .flex-grid img:first-child {
    margin-right: 0.5rem;
  }  
`;

const ListMoviesStyled = styled.div`
    ${props => props.ui === 'flex' ? css`
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin: 0 20px;
    ` : css `
      display: grid;
      grid-template-columns: repeat(2, auto);
      grid-template-rows: auto;
      gap: 10px 10px;
    `}
    
    @media screen and (min-width: 769px) {
      ${props => props.ui === 'grid' && css `
        display: grid;
        grid-template-columns: repeat(4, auto);
        grid-template-rows: auto;
        gap: 10px 10px;
      `}
    }

    @media screen and (max-width: 767px) {
      ${props => props.ui === 'grid' && css `
        display: grid;
        grid-template-columns: auto;
        grid-template-rows: auto;
        gap: 10px 10px;
      `}
    }
`;

function ListMovies() {
    const {query} = useRouter();
    const moviesContext = useContext(MoviesContext);
    const {loading, movies, searchInfo, type, page} = moviesContext;
    const [ui, setUI] = useImmer(() => 'grid');

    useEffect(() => {
      if (!query?.id) {
        const a = window.innerHeight;
        const c = document.body.offsetHeight;
        window.addEventListener('scroll', handleInfiniteScroll);
      }
    }, [query?.id]);

    let throttleTimer;
    const throttle = (callback, time) => {
      if (throttleTimer) return;
      throttleTimer = true;
      setTimeout(() => {
        callback();
        throttleTimer = false;
      }, time);
    };
    
    const handleInfiniteScroll = () => {
      throttle(() => {
        const endOfPage = window.innerHeight + window.pageYOffset >= document.body.offsetHeight;

        if (endOfPage) {
          searchInfo(`${type === 'now' ? API_URL_NOW_PLAYING : API_URL_TOP_RATED}${page.current + 1}`);
        }

        if (page?.current === page?.total) {
          removeInfiniteScroll();
        }
      }, 1000);
    };

    const removeInfiniteScroll = () => {
      window.removeEventListener("scroll", handleInfiniteScroll);
    };

  return (
    <>
        <BarStyled>
          <TabMovies/>
          <div className="flex-grid">
            <img loading="lazy" width="30" height="30" src="/pixels.png" alt="pixels" onClick={() => setUI('grid')}/>
            <img loading="lazy" width="30" height="30" src="/list.png" alt="list" onClick={() => setUI('flex')}/>
          </div>
        </BarStyled>
        {loading ?
        <SkeletonCard/> :
        <ListMoviesStyled ui={ui}>
            {movies?.length > 0 && movies?.map((movie, index) => <ItemMovies key={index} movie={movie} ui={ui}/>)}
        </ListMoviesStyled>}
      </>  
  )
}



export default ListMovies;
