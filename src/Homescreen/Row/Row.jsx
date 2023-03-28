import axios from '../../axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import './row.scss'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useRef } from 'react';

function Row({ title, fetchUrl, isLargeRow = false }) {
    const [movies, setMovies] = useState([]);
    const rowRef = useRef(null);
    const [hoveredMovie, setHoveredMovie] = useState(null);


    const base_url = "http://image.tmdb.org/t/p/original/";

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results)
            return request;
        }

        fetchData();
    }, [fetchUrl]);

    const handleArrowClick = (direction) => {
        const row = rowRef.current;
        const rowScrollWidth = row.scrollWidth;
        const rowVisibleWidth = row.offsetWidth;
        const rowScrollLeft = row.scrollLeft;
        let scrollDistance = 0;

        console.log(rowScrollWidth);
        console.log(rowVisibleWidth);
        console.log(rowScrollLeft);

        if (direction === 'left') {
            scrollDistance = rowScrollLeft - rowVisibleWidth >= 0 ? rowVisibleWidth : rowScrollLeft;
            row.scrollTo({
                left: rowScrollLeft - scrollDistance,
                behavior: 'smooth',
            });
        } else {
            scrollDistance = rowScrollLeft + rowVisibleWidth >= rowScrollWidth ? rowScrollWidth - rowScrollLeft : rowVisibleWidth;
            row.scrollTo({
                left: rowScrollLeft + scrollDistance,
                behavior: 'smooth',
            });
        }
    };

    const handleMovieHover = (movie) => {
        setHoveredMovie(movie);
    }
    const handleMouseLeave = () => {
        setHoveredMovie(null);
    }

    function truncate(string, n) {
        return string?.length > n ? string.substr(0, n - 1) + "..." : string;
    }


    return (
        <div className='row'>
            <h2 className='row_title'>{title}</h2>
            <div className='row_posters'>
                <ArrowBackIosNewIcon
                    className='sliderArrow Left'
                    onClick={() => handleArrowClick('left')}
                />

                <div className="row_posterMovies" ref={rowRef}>
                    {movies.map((movie) => (

                        <div
                            key={movie.id}
                            className={"row_posterContainer"}
                            onMouseEnter={() => handleMovieHover(movie)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <img
                                className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                                src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                alt={movie.name}
                            />
                            {hoveredMovie && hoveredMovie.id === movie.id && (
                                <div className="row_info">
                                    <h3>{movie.title || movie.name}</h3>
                                    <p>{truncate(
                                        movie?.overview,
                                        150
                                    )}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <ArrowForwardIosIcon
                    className='sliderArrow Right'
                    onClick={() => handleArrowClick('right')}
                />
            </div>

        </div>
    )
}

export default Row
