import { useContext } from 'react';
import styled from 'styled-components';
import { API_URL_NOW_PLAYING, API_URL_TOP_RATED } from '../../contants/movieContants';
import MoviesContext from '../../contexts/MoviesContext';

const TabMoviesStyled = styled.div`
    .tabs {
        display: flex;
        background-color: #eee;
        border-radius: 8px;
        padding: 5px;
    }
    
    .tabs .tab-item.active {
        color: #6a5af9;
        background-color: white;
    }
    
    .tabs .tab-item {
        white-space: nowrap;
        padding: 10px 15px;
        cursor: pointer;
        color: #999;
        font-weight: 500;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: inherit;
    }
`;

function TabMovies() {
    const {searchInfo, type, setAct, setLoad} = useContext(MoviesContext);
    
    const handleActive = act => {
        setAct(act);
        setLoad();
        searchInfo(`${act === 'now' ? API_URL_NOW_PLAYING : API_URL_TOP_RATED}1`);
    }
  return (
    <TabMoviesStyled>
        <div className="tabs">
            <div className={type === 'now' ? 'active tab-item' : 'tab-item'} onClick={() => handleActive('now')}>Now Playing</div>
            <div className={type === 'top' ? 'active tab-item' : 'tab-item'} onClick={() => handleActive('top')}>Top Rated</div>
        </div>
    </TabMoviesStyled>
  )
}

export default TabMovies;