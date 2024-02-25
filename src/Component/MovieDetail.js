import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userEmail } from "./AtomSt";
import { useRecoilState } from "recoil";

import movie1 from "../assets/poster/wonka.jpg";
import movie2 from "../assets/poster/gungook.jpg";
import movie3 from "../assets/poster/qukal.jpg";
import movie4 from "../assets/poster/simin.jpg";
import movie5 from "../assets/poster/sopung.jpg";
import movie6 from "../assets/poster/dogdys.jpg";
import movie7 from "../assets/poster/deadman.jpg";
import movie8 from "../assets/poster/agail.jpg";
import movie9 from "../assets/poster/shark.jpg";
import movie10 from "../assets/poster/dmz.jpg";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { red } from "@mui/material/colors";

export default function MovieDetail() {
  const param = useParams().index;

  const apikey = process.env.REACT_APP_APIKEY;
  const [movie, setMovie] = useState();
  const [dbData, setDbData] = useState();
  const [dbReview, setDbReview] = useState();
  const [content, setContent] = useState();
  const [grade, setGrade] = useState();
  const [selectedReviewId, setSelectedReviewId] = useState();
  const [selectedDeleteId, setSelectedDeleteId] = useState();
  const [selectedContent, setSelectedContent] = useState();
  const [selectedGrade, setselectedGrade] = useState();
  const [userId] = useRecoilState(userEmail);

  const posterImage = [
    movie1,
    movie2,
    movie3,
    movie4,
    movie5,
    movie6,
    movie7,
    movie8,
    movie9,
    movie10,
  ];

  const getMovie = async (param) => {
    let url =
      "https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?";
    url = url + `key=${apikey}`;
    url = url + "&targetDt=20240216";
    console.log(url);

    fetch(url)
      .then((resp) => resp.json())
      .then((data) => setMovie(data.boxOfficeResult.dailyBoxOfficeList[param]))
      .catch((err) => console.error(err));
  };

  const getDbMovie = (id) => {
    fetch(`http://localhost:8080/movie/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setDbData(data))
      .catch((err) => console.error(err));
  };

  const getDbReview = (movieId) => {
    fetch(`http://localhost:8080/movie/review/${movieId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setDbReview(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getMovie(param);

    const id = parseInt(param) + 1;
    getDbMovie(id);
    getDbReview(id);
  }, [param]);

  const [rating, setRating] = useState([]);
  const handleRating = (idx, selectedRating) => {
    const newRating = [...rating];
    newRating[idx] = selectedRating;
    setRating(newRating);
  };

  const [openModify, setOpenModify] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openInsert, setOpenInsert] = React.useState(false);

  const handleClickOpen = (e, reviewId, content, grade) => {
    setSelectedReviewId(reviewId);
    setSelectedContent(content);
    setselectedGrade(grade);
    setOpenModify(true);
  };

  const handleClickOpenDelete = (e, reviewId) => {
    setSelectedDeleteId(reviewId);
    setOpenDelete(true);
  };

  const handleClickOpenInsert = (e) => {
    setOpenInsert(true);
  };

  const handleClose = () => {
    setSelectedReviewId(null);
    setSelectedDeleteId(null);
    setOpenModify(false);
    setOpenDelete(false);
    setOpenInsert(false);
  };

  const divWriter = document.getElementById("writer");
  console.log("divWriter: ", divWriter);

  const getWriterId = (string) => {
    return string.substring(0, string.indexOf("@"));
  };

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const handleGrade = (e) => {
    setGrade(e.target.value);
  };

  const onSubmit = (reviewId) => {
    fetch(`http://localhost:8080/movie/review/${reviewId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("loginToken"),
      },
      body: JSON.stringify({
        content: content,
        grade: grade,
      }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .then(window.location.reload())
      .catch((err) => console.error(err));
  };

  const handleDelete = (reviewId) => {
    fetch(`http://localhost:8080/movie/review/${reviewId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("loginToken"),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error");
        }
        window.location.reload();
      })
      .catch((err) => console.error(err));
  };

  const handleInsert = () => {
    fetch(`http://localhost:8080/movie/review/1`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("loginToken"),
      },
      body: JSON.stringify({
        content: content,
        grade: grade,
      }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .then(window.location.reload())
      .catch((err) => console.error(err));
  };
  const [sortedReviews, setSortedReviews] = useState([]);
  const [sortBy, setSortBy] = useState("");

  const sortReviews = (reviews) => {
    if (sortBy === "grade") {
      return reviews.slice().sort((a, b) => a.grade - b.grade);
    } else if (sortBy === "date") {
      return reviews
        .slice()
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    } else {
      return reviews;
    }
  };

  const handleSortBy = (criteria) => {
    setSortBy(criteria);
  };

  useEffect(() => {
    setSortedReviews(sortReviews(dbReview));
  }, [dbReview, sortBy]);

  const [orderBy, setOrderBy] = useState("asc");
  const handleSortReviews = (orderBy) => {
    if (orderBy === "asc") {
      const sortedReviewsAsc = [...sortedReviews].sort(
        (a, b) => a.grade - b.grade
      );
      setSortedReviews(sortedReviewsAsc);
    } else {
      const sortedReviewsDesc = [...sortedReviews].sort(
        (a, b) => b.grade - a.grade
      );
      setSortedReviews(sortedReviewsDesc);
    }
  };

  return (
    <div className="bg-black h-full w-full">
      {movie && dbReview && (
        <div>
          <div className="p-10">
            <img
              src={posterImage[param]}
              alt="Movie Poster"
              className="w-72 mb-5"
            />
            <div className="text-3xl font-extrabold mb-3 text-white">
              {movie.movieNm}
            </div>
            <div className="text-lg font-medium text-white">
              개봉일: {dbData.release_date}
            </div>
            <div className="text-lg font-medium text-white">
              상영시간: {dbData.running_time}
            </div>
            <div className="text-lg font-medium text-white">
              등급: {dbData.age_rating}
            </div>
            <div className="text-lg font-medium text-white">
              장르: {dbData.genre}
            </div>
            <div className="text-lg font-medium text-white">
              시놉시스: {dbData.synopsis}
            </div>
            <div className="text-lg font-medium text-white">
              감독: {dbData.director}
            </div>
            <div className="text-lg font-medium text-white">
              출연진: {dbData.casts}
            </div>
          </div>
          <div className="flex justify-end items-center text-white mb-3 mr-12">
            <React.Fragment>
              <Button
                variant="outlined"
                onClick={(e) => handleClickOpenInsert(e)}
                style={{
                  backgroundColor: red[400],
                  fontWeight: "bold",
                  color: "white",
                  borderColor: red[400],
                  marginRight: "5px",
                }}
              >
                등록
              </Button>
              <Dialog open={openInsert} onClose={handleClose}>
                <DialogTitle>등록</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    등록할 내용을 작성해주세요
                  </DialogContentText>
                  <TextField
                    disabled
                    id="email"
                    label="Email"
                    defaultValue={userId}
                    variant="standard"
                    fullWidth
                  />
                  <TextField
                    onChange={handleContent}
                    autoFocus
                    required
                    margin="dense"
                    id="content"
                    name="content"
                    label="새로운 내용"
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                  <TextField
                    onChange={handleGrade}
                    autoFocus
                    required
                    margin="dense"
                    id="grade"
                    name="grade"
                    label="새로운 등급"
                    type="number"
                    fullWidth
                    variant="standard"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>취소</Button>
                  <Button onClick={handleInsert}>등록</Button>
                </DialogActions>
              </Dialog>
            </React.Fragment>
          </div>
          <div className="flex justify-end">
            <button
              variant="outlined"
              className="bg-red-400 text-white px-4 py-2 rounded-lg mr-4"
              onClick={() => {
                setOrderBy(orderBy === "asc" ? "desc" : "asc");
                handleSortReviews(orderBy === "asc" ? "desc" : "asc");
              }}
            >
              등급 {orderBy === "asc" ? "낮은 순" : "높은 순"}
            </button>
            <button
              variant="outlined"
              className="bg-red-400 text-white px-4 py-2 rounded-lg"
              onClick={() => handleSortBy("date")}
            >
              날짜순 정렬
            </button>
          </div>
          <div className="pl-10 pr-10 pb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sortedReviews.map((rv, idx) => (
                <div
                  key={idx}
                  className="bg-gray-800 rounded-lg overflow-hidden"
                >
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <svg
                        className="fill-white h-8 w-58 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                      </svg>
                      <div className="flex w-full content-between">
                        <div className="text-lg font-medium text-white">
                          {getWriterId(rv.writer)}
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-center text-white mb-2">
                        ⭐{rv.grade}
                      </div>
                    </div>
                    <div className="text-lg font-medium text-white mb-4">
                      {rv.content}
                    </div>
                    <div className="text-lg font-medium text-white mb-2">
                      {rv.date}
                    </div>
                    <div className="flex justify-end">
                      <div className="items-center text-white mt-1">
                        <React.Fragment>
                          <Button
                            review={rv}
                            variant="outlined"
                            onClick={(e) =>
                              handleClickOpen(
                                e,
                                rv.review_id,
                                rv.content,
                                rv.grade
                              )
                            }
                            style={{
                              backgroundColor: red[400],
                              fontWeight: "bold",
                              color: "white",
                              borderColor: red[400],
                              marginRight: "5px",
                            }}
                          >
                            수정
                          </Button>
                          <Dialog
                            open={openModify}
                            onClose={handleClose}
                            PaperProps={{
                              component: "form",
                              onSubmit: (e) => {
                                e.preventDefault();
                                onSubmit(selectedReviewId);
                                handleClose();
                              },
                            }}
                          >
                            <DialogTitle>수정</DialogTitle>
                            <DialogContent>
                              <DialogContentText>
                                수정할 내용을 작성해주세요
                              </DialogContentText>
                              <TextField
                                onChange={handleGrade}
                                autoFocus
                                required
                                margin="dense"
                                id="grade"
                                name="grade"
                                label="새로운 등급"
                                type="number"
                                fullWidth
                                variant="standard"
                                defaultValue={selectedGrade}
                              />
                              <TextField
                                onChange={handleContent}
                                autoFocus
                                required
                                margin="dense"
                                id="content"
                                name="content"
                                label="새로운 내용"
                                type="text"
                                fullWidth
                                variant="standard"
                                defaultValue={selectedContent}
                              />
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleClose}>취소</Button>
                              <Button type="submit">저장</Button>
                            </DialogActions>
                          </Dialog>
                        </React.Fragment>
                      </div>
                      <div className="items-center text-white mt-1">
                        <React.Fragment>
                          <Button
                            review={rv}
                            variant="outlined"
                            onClick={(e) =>
                              handleClickOpenDelete(e, rv.review_id)
                            }
                            style={{
                              backgroundColor: red[400],
                              fontWeight: "bold",
                              color: "white",
                              borderColor: red[400],
                              marginRight: "5px",
                            }}
                          >
                            삭제
                          </Button>
                          <Dialog
                            open={openDelete}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title">
                              삭제
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                해당 리뷰를 삭제하시겠습니까?
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button
                                onClick={(e) => handleDelete(selectedDeleteId)}
                              >
                                삭제
                              </Button>
                              <Button onClick={handleClose} autoFocus>
                                취소
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </React.Fragment>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
