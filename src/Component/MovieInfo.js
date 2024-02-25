import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const posterImages = [
  require("../assets/poster/wonka.jpg"),
  require("../assets/poster/gungook.jpg"),
  require("../assets/poster/qukal.jpg"),
  require("../assets/poster/simin.jpg"),
  require("../assets/poster/sopung.jpg"),
  require("../assets/poster/dogdys.jpg"),
  require("../assets/poster/deadman.jpg"),
  require("../assets/poster/agail.jpg"),
  require("../assets/poster/shark.jpg"),
  require("../assets/poster/dmz.jpg"),
];
export default function MovieInfo() {
  let apikey = process.env.REACT_APP_APIKEY;
  const [boxlist, setBoxlist] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let url =
          "https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?";
        url = url + `key=${apikey}`;
        url = url + "&targetDt=20240216";
        console.log(url);
        const response = await fetch(url);
        const data = await response.json();
        setBoxlist(data.boxOfficeResult.dailyBoxOfficeList);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="flex-col w-4/5 bg-black">
      <div className="text-center text-3xl font-appleB font-extrabold text-red-400">
        Top 10
      </div>
      <div className="flex flex-wrap justify-center items-center">
        {boxlist.map((movie, index) => (
          <div
            key={index}
            className="flex justify-center items-center w-1/11 m-5"
          >
            <Link to={`/movie/${index}`}>
              <img
                src={posterImages[index]}
                alt="Movie Poster"
                className="w-44 mb-2"
              />
              <div
                style={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  width: "176px",
                  textAlign: "center",
                  color: "white",
                }}
              >
                {movie.movieNm}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
