import React from 'react'
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import movie1 from "../assets/poster/wonka.jpg"
import movie2 from "../assets/poster/gungook.jpg"
import movie3 from "../assets/poster/qukal.jpg"
import movie4 from "../assets/poster/simin.jpg"
import movie5 from "../assets/poster/sopung.jpg"
import movie6 from "../assets/poster/dogdys.jpg"
import movie7 from "../assets/poster/deadman.jpg"
import movie8 from "../assets/poster/agail.jpg"
import movie9 from "../assets/poster/shark.jpg"
import movie10 from "../assets/poster/dmz.jpg"

export default function MovieInfo() {
    let apikey = process.env.REACT_APP_APIKEY

    // let seq = useParams().seq()
    const [boxlist, setBoxlist] = useState([])
    const [tag, setTag] = useState([])

    const posterImage = [movie1, movie2, movie3, movie4, movie5, movie6, movie7, movie8, movie9, movie10]

    // const options = {
    //     method: 'GET',
    //     headers: {
    //       accept: 'application/json',
    //       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNGQwY2FkMGU1NDAyMzFkODQ1OTI1MjNhNzAxNzc1MyIsInN1YiI6IjY1YzA5NmVlYTM1YzhlMDE3Y2Q3ODE4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WsPfi3MDkQ3R01A5_w0Cn43_P8_8cCQp7cRoYyylPsg'
    //     }
    //   };

    useEffect (() => {
        let url = "https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?"
        url = url + `key=${apikey}`
        url = url + '&targetDt=20240216'
        console.log(url)

        fetch(url)
            .then(resp => resp.json())
            .then(data => setBoxlist(data.boxOfficeResult.dailyBoxOfficeList))
            // .then(data => setBoxlist(data.boxOfficeResult.dailyBoxOfficeList))
            .catch(err => console.error(err))
    }, [])

    useEffect(()=>{
        console.log(boxlist)

         let tm = boxlist.map((item, index) => (
            <div key={index} className="flex justify-center items-center w-1/11 m-5">

                <Link to={`/movie/${index}`}>
                    <img src={posterImage[index]} alt="Movie Poster" className="w-44 mb-2" />
                    <div style={{overflow:'hidden', whiteSpace:'nowrap', textOverflow:'ellipsis', width:'176px', textAlign:'center', color:"white"}}>{item.movieNm}</div>
                </Link>

                {/* <div className="flex-col justify-center items-center">
                    <img src={posterImage[index]} alt="Movie Poster" className="w-44 mb-2" />
                    <div style={{overflow:'hidden', whiteSpace:'nowrap', textOverflow:'ellipsis', width:'176px', textAlign:'center', color:"white"}}>{item.movieNm}</div>
                </div> */}
            </div>
        ))
        setTag(tm)

    }, [boxlist]);

  return (
    <div className='flex-col w-4/5 bg-black'>
        <div className='text-center text-3xl font-appleB font-extrabold text-red-400'>Top 10</div>
        
        <div className="flex flex-wrap justify-center items-center"> 
            {tag}
        </div>
    </div>
  )
}

