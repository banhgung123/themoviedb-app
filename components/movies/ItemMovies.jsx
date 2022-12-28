import { useRouter } from 'next/router';
import styled from 'styled-components';
import { IMG_PATH } from '../../contants/movieContants';
import moment from 'moment';

const ItemMoviesStyled = styled.div`
    .movie {
        background-color: #373b69;
        border-radius: 3px;
        box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        position: relative;
        margin: 20px;
        width: ${props => props.ui === 'flex' && '300px'};
        cursor: pointer;
    }

    @media screen and (max-width: 768px) {
        .movie {
            width: ${props => props.ui === 'flex' && '200px'}
        }
    }

    .movie img {
        width: 100%;
    }

    .movie-date {
        display: inline-block;
        padding: 0 1rem 1rem;
        color: #eee;
    }

    .movie-info {
        color: #eee;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem 1rem 1rem;
        letter-spacing: 1px;
    }

    .movie-info h3 {
        margin: 0;
    }

    .movie-info span {
        background-color: #22254b;
        border-radius: 3px;
        font-weight: bold;
        padding: 0.25rem 0.5rem;
    }

    .movie-info span.green {
        color: rgb(39, 189, 39);
    }

    .movie-info span.orange {
        color: orange;
    }

    .movie-info span.red {
        color: rgb(189, 42, 42);
    }

    .overview {
        background-color: #fff;
        padding: 2rem;
        position: absolute;
        max-height: 100%;
        overflow: auto;
        left: 0;
        bottom: 0;
        right: 0;
        transform: translateY(101%);
        transition: transform 0.3s ease-in;
    }

    .overview h3 {
        margin-top: 0;
    }

    .movie:hover .overview {
        transform: translateY(0);
    }
    
    .skeleton-card {
        width: 100%;
        border-radius: 3px;
        position: relative;
        background-color: #eaeaea;
        transition: all 200ms ease-in-out;
    }

    .skeleton-card::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transform: translateX(-100%);
        animation: load 1s infinite;
    }

    @keyframes load {
        100% {
            transform: translateX(100%);
        }
    }
`;

function ItemMovies({movie, ui}) {
    const {push} = useRouter();
    const { id, release_date, poster_path, title, vote_average, overview } = movie;

    const getClassByRate = vote => {
        if (vote >= 8) {
            return 'green';
        } else if (vote >= 5) {
            return 'orange';
        } else {
            return 'red';
        }
    };

  return (
    <ItemMoviesStyled onClick={() =>  push({pathname: '/', query: {id: id}})} ui={ui}>
        <div className="movie">
            <img loading="lazy" src={`${IMG_PATH}${poster_path}`} alt={title}/>
            <div className="movie-info">
                <h3>{title}</h3>
                <span className={getClassByRate(vote_average)}>{vote_average}</span>
            </div>
            <span className="movie-date">{moment(release_date).format('MMM DD, YYYY')}</span>
            <div className="overview">
                <h3>Overview:</h3>
                {overview}
            </div>
        </div>
    </ItemMoviesStyled>
  )
}

export default ItemMovies;