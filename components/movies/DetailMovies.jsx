import { useRouter } from 'next/router';
import styled from 'styled-components';
import { API_KEY, API_URL_DETAIL, IMG_PATH } from '../../contants/movieContants';
import moment from 'moment';
import useMovies from '../../hooks/useMovies';
import { lazy } from 'react';

const Loading = lazy(() => import('../loading/Loading'));
const PageStyled = styled.div`
  padding: 1rem;
`;

const BackStyled = styled.button`
  border: none;
  border-radius: 100px;
  background-color: #eee;
  padding: 1rem;
  margin-left: 1rem;
  width: 100px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
`;

const DetailStyled = styled.div`
  display: flex;
  color: #eee;
  padding: 1rem;

  img {
    width: 300px;
    flex-shrink: 0;
    border-radius: 3px;
  }

  .info {
    padding: 0 1rem;
  }

  @media screen and (max-width: 425px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

function DetailMovies() {
    const {push, query} = useRouter();
    const {loading, movie} = useMovies(`${API_URL_DETAIL}${query?.id}?api_key=${API_KEY}`);
    const { release_date, poster_path, title, vote_average, overview, runtime, genres } = movie;
    let genstr = '';
    genres?.length > 0 && genres?.map(g => g.name).forEach(element => {
      genstr = genstr + element + ', ';
    });
    
    return (
      <PageStyled>
          <BackStyled onClick={() => push('/')}>Back</BackStyled>
          {loading ?
          <Loading/> :
          <DetailStyled>
            <img loading="lazy" src={`${IMG_PATH}${poster_path}`} alt={title}/>
            <div className="info">
              <h2>{`${title} (${moment(release_date).format('YYYY')})`}</h2>
              <span>{genstr.slice(0, genstr.length - 2)}{` - ${runtime}m`}</span>
              <h3>{`Score: ${Number(vote_average).toFixed(1)}`}</h3>
              <h4>Overview: </h4>
              <span>{overview}</span>
            </div>
          </DetailStyled>
          }
      </PageStyled>
    )
}

export default DetailMovies;