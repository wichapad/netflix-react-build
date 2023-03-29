import React from 'react'
import './homeScreen.scss'
import Navbar from './Navbar/Navbar'
import Banner from './Banner/Banner'
import Row from './Row/Row'
import requests from '../Requests'

function HomeScreen() {
  return (
    <div className='homeScreen'>
      <Navbar />
      <Banner />
      <Row
        title='NETFLIX ORIGINAL'
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
        
      />
      <Row title='Trending Now'fetchUrl={requests.fetchTrending} />
      <Row title='Action Movies'fetchUrl={requests.fetchActionMovies} />
      <Row title='Comedy Movies'fetchUrl={requests.fetchComedyMovies} />
      <Row title='Horror Movies'fetchUrl={requests.fetchHorrorMovies} />
      <Row title='Romance Movies'fetchUrl={requests.fetchRomanceMovies} />
      <Row title='Documentaries'fetchUrl={requests.fetchDocumentaries} />
      <Row title='Top Rated'fetchUrl={requests.fetchTopRated} />
    </div>
  )
}

export default HomeScreen
