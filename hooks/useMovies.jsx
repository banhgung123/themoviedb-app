import { useRouter } from 'next/router';
import { useImmer } from 'use-immer';
import { useEffect } from 'react';

function  useMovies(url) {
    const {query} = useRouter();
    const [loading, setLoading] = useImmer(() => true);
    const [type, setType] = useImmer(() => 'now');
    const [movies, setMovies] = useImmer(() => []);
    const [movie, setMovie] = useImmer(() => ({}));
    const [page, setPage] = useImmer(() => ({
        current: 1,
        total: 0
    }));

    useEffect(() => {
        getInfo(url);
    }, [url]);

    const sleep = ms => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    const getInfo = async url => {
        if (page?.current === page?.total) return;
        await sleep(500);
        const resp = await fetch(url);
        const respData = await resp.json();
        if (respData) setLoading(false);

        if (query?.id) {
            setMovie(respData);
        } else {
            if (respData?.page > 1) setMovies([...movies, ...respData?.results]);
            else setMovies(respData?.results);
            setPage(draft => {
                draft.current = respData?.page;
                draft.total = respData?.total_pages;
            });
        }
    };

    const searchInfo = async url => {
        getInfo(url);
    };

    const setLoad = () => setLoading(true);

    const setAct = act => {
        setType(act);
    };
    
  if (query?.id) return {loading, movie, type, setAct};
  return {loading, movies, searchInfo, type, setAct, setLoad, page};
}

export default useMovies;