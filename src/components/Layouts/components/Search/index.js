import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
// import axios from 'axios';

import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Search.module.scss';
import { useDebounce } from '~/hooks';
// import request from '~/utils/request';
import * as request from '~/utils/request';
import * as searchSevices from '~/apiServices/searchSevices';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef();

    const debounced = useDebounce(searchValue, 500);
    useEffect(() => {
        if (!debounced.trim()) {
            // setSearchValue('');
            // setSearchResult([]);
            handleClear();
            return;
        }
        setLoading(true);

        //TODO: use Fetch to get Data
        // fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(debounced)}&type=less`)
        //     .then((response) => response.json())
        //     .then((result) => setSearchResult(result.data))
        //     .finally(() => setLoading(false));

        //TODO: use axios to get Data
        // axios
        //     .get(`https://tiktok.fullstack.edu.vn/api/users/search`, {
        //         params: {
        //             q: debounced,
        //             type: 'less',
        //         },
        //     })
        //     .then((response) => setSearchResult(response.data.data))
        //     .finally(() => setLoading(false));

        //TODO: use axios.create to get data
        // request
        //     .get('users/search', {
        //         params: {
        //             q: debounced,
        //             type: 'less',
        //         },
        //     })
        //     .then((response) => setSearchResult(response.data.data))
        //     .finally(() => setLoading(false));

        //TODO: use axios.create and custom get method to get data
        // request
        //     .get('users/search', { params: { q: debounced, type: 'less' } })
        //     .then((response) => setSearchResult(response.data))
        //     .finally(() => setLoading(false));

        //TODO: use Async/Await , axios.create and custom get method to get data
        // const fetchAPI = async () => {
        //     try {
        //         const res = await request.get('users/search', { params: { q: debounced, type: 'less' } });
        //         setSearchResult(res.data);
        //         setLoading(false);
        //     } catch {
        //         setLoading(false);
        //     }
        // };
        // fetchAPI();

        const fetchAPI = async () => {
            const result = await searchSevices.search(debounced);
            setSearchResult(result);
            setLoading(false);
        };
        fetchAPI();
    }, [debounced]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };
    const handleShowResult = () => {
        setShowResult(true);
    };
    return (
        <HeadlessTippy
            interactive={true}
            visible={showResult && searchResult.length > 0}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex={-1} {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>Accounts</h4>
                        {searchResult.map((data) => (
                            <AccountItem key={data.id} data={data} />
                        ))}
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    placeholder="Search accounts and videos"
                    spellCheck={false}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={handleShowResult}
                />
                {(loading && <FontAwesomeIcon icon={faSpinner} className={cx('loading')} />) ||
                    (!!searchValue && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    ))}
                <button className={cx('search-btn')}>
                    <SearchIcon />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;
