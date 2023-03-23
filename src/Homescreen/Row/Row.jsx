import axios from '../../axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import './row.scss'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function Row({ title, fetchUrl, isLargeRow = false }) {
    const [movies, setMovies] = useState([]);

    const base_url = "http://image.tmdb.org/t/p/original/";

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results)
            return request;
        }

        fetchData();
    }, [fetchUrl]);

    console.log(movies);

    return (
        <div className='row'>
            <h2 className='row_title'>{title}</h2>
            <div className='row_posters'>
                <button className="rowSlide_Left"><ArrowBackIosNewIcon/></button>
                <button className="rowSlide_Right"><ArrowForwardIosIcon/></button>
                <div className="row_posterMovies">
                {movies.map((movie) => (
                    <img
                        className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                        key={movie.id}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name}
                    />
                ))}
                </div>
            </div>

        </div>
    )
}

export default Row
