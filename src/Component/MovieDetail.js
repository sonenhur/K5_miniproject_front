import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { userEmail } from './AtomSt'
import { useRecoilState } from "recoil";

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

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { red } from '@mui/material/colors';
import { getByPlaceholderText } from '@testing-library/react'

export default function MovieDetail() {
    const param = useParams().index

    let apikey = process.env.REACT_APP_APIKEY
    const [movie, setMovie] = useState();
    const [dbData, setDbData] = useState();
    const [dbReview, setDbReview] = useState();
    const [content, setContent] = useState()
    const [grade, setGrade] = useState()
    const [selectedReviewId, setSelectedReviewId] = useState()
    const [selectedDeleteId, setSelectedDeleteId] = useState()
    const [selectedContent, setSelectedContent] = useState()
    const [selectedGrade, setselectedGrade] = useState()
    const [userId] = useRecoilState(userEmail); 

    const posterImage = [movie1, movie2, movie3, movie4, movie5, movie6, movie7, movie8, movie9, movie10]

    const getMovie = async (param) => {

        let url = "https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?"
        url = url + `key=${apikey}`
        url = url + '&targetDt=20240216'
        console.log(url)

        fetch(url)
            .then(resp => resp.json())
            .then(data => setMovie(data.boxOfficeResult.dailyBoxOfficeList[param]))
            .catch(err => console.error(err))
    }

    const getDbMovie = (id) => {
        fetch(`http://10.125.121.181:8080/movie/${id}`, {
            method: "GET"
        })
            .then(res => res.json())
            // .then(res => console.log(res))
            .then(data => setDbData(data))
            .catch(err => console.error(err))
    }

    const getDbReview = (movieId) => {
        fetch(`http://10.125.121.181:8080/movie/review/${movieId}`, {
            method: "GET"
        })
            .then(res => res.json())
            .then(data => setDbReview(data))
            .catch(err => console.error(err))
    }

    useEffect(() => {
        getMovie(param);

        const id = parseInt(param) + 1
        getDbMovie(id);
        getDbReview(id);

    }, [param])

    const [rating, setRating] = useState([]) // rating을 빈 배열로 초기화 할 것
    const handleRating = ((idx, selectedRating) => {
        const newRating = [...rating] // [...rating]는 전개 연산자를 이용하여 배열 rating의 모든 요소를 새로운 배열에 복사하는 것
        newRating[idx] = selectedRating
        setRating(newRating)
    })

    const [openModify, setOpenModify] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [openInsert, setOpenInsert] = React.useState(false);

    const handleClickOpen = (e, reviewId, content, grade) => {
        setSelectedReviewId(reviewId)
        setSelectedContent(content)
        setselectedGrade(grade)
        // console.log("리뷰아이디:", reviewId)
        // console.log("리뷰아이디:", content)
        // console.log("grade", grade)
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
        setSelectedReviewId(null)
        setSelectedDeleteId(null);
        setOpenModify(false);
        setOpenDelete(false);
        setOpenInsert(false)
    };

    const divWriter = document.getElementById("writer")
    console.log("divWriter: ", divWriter)

    const getWriterId = (string) => {
        return string.substring(0, string.indexOf("@"))
    }

    const handleContent = (e) => {
        setContent(e.target.value)
    }

    const handleGrade = (e) => {
        setGrade(e.target.value)
    }

    const onSubmit = (reviewId) => {
        fetch(`http://10.125.121.181:8080/movie/review/${reviewId}`, {
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
            .then(res => res.json())
            .then(res => console.log(res))
            .then(window.location.reload())
            .catch(err => console.error(err))
    }

    const handleDelete = (reviewId) => {
        fetch(`http://10.125.121.181:8080/movie/review/${reviewId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("loginToken"),
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Error")
                }
                window.location.reload()
            })
            .catch(err => console.error(err))
    }

    const handleInsert = () => {
        fetch(`http://10.125.121.181:8080/movie/review/1`, {
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
            .then(res => res.json())
            .then(res => console.log(res))
            .then(window.location.reload())
            .catch(err => console.error(err))
    }

    return (
        <div className='bg-black h-full w-full'>
            {movie && dbReview && (
                <div>
                    <div className='p-10'>
                        <img src={posterImage[param]} alt="Movie Poster" className="w-72 mb-5" />
                        <div className='text-3xl font-extrabold mb-3 text-white'>{movie.movieNm}</div>
                        <div className='text-lg font-medium text-white'>개봉일: {dbData.release_date}</div>
                        <div className='text-lg font-medium text-white'>상영시간: {dbData.running_time}</div>
                        <div className='text-lg font-medium text-white'>등급: {dbData.age_rating}</div>
                        <div className='text-lg font-medium text-white'>장르: {dbData.genre}</div>
                        <div className='text-lg font-medium text-white'>시놉시스: {dbData.synopsis}</div>
                        <div className='text-lg font-medium text-white'>감독: {dbData.director}</div>
                        <div className='text-lg font-medium text-white'>출연진: {dbData.casts}</div>
                    </div>
                    <div className='flex justify-end items-center text-white mb-3 mr-12'>
                         <React.Fragment>
                            <Button variant="outlined" onClick={(e) => handleClickOpenInsert(e)}
                                style={{
                                    backgroundColor: red[400],
                                    fontWeight: "bold",
                                    color: "white",
                                    borderColor: red[400],
                                    marginRight: "5px"
                                }}>
                                등록
                            </Button>
                            <Dialog 
                                open={openInsert}
                                onClose={handleClose}
                            >
                                <DialogTitle>Insert</DialogTitle>
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
                                        label="New Content"
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
                                        label="New Grade"
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

                    <div className='pl-10 pr-10 pb-10' style={{ width: '100%' }}>
                        <div className='w-full'>
                            {dbReview.map((rv, idx) => (
                                <div key={idx} className='flex-col justify-center items-center mb-5 bg-gray-800 rounded-lg'>
                                    <div className='flex justify-between items-center border border-solid border-gray-400 p-3 flex-nowrap'>
                                        <div id="writer" className='flex items-center justify-center text-lg text-center text-white font-medium w-32 pr-3 border-2 border-gray-400'>
                                            <svg className="fill-white h-8 w-8 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" /></svg>
                                            {getWriterId(rv.writer)}
                                        </div>
{/* border-r-2 */}
                                        <div className='text-2xl font-bold text-center text-white w-16 mr-3 border-2 border-gray-400'>
                                            ⭐{rv.grade}
                                        </div>

                                        <div className='text-lg font-medium text-white border-2 border-gray-400 w-560 ml-3 pr-3'>
                                            {rv.content}
                                        </div>

                                        {/* <div className='text-lg font-medium text-center text-white w-48  ml-3 pr-3 border-r-2 border-gray-400'>
                                                <button onClick={() => handleRating(idx,1)} className='mr-2'>{rating[idx]>=1 ? '❤️':'⭕'}</button>
                                                <button onClick={() => handleRating(idx,2)} className='mr-2'>{rating[idx]>=2 ? '❤️':'⭕'}</button>
                                                <button onClick={() => handleRating(idx,3)} className='mr-2'>{rating[idx]>=3 ? '❤️':'⭕'}</button>
                                                <button onClick={() => handleRating(idx,4)} className='mr-2'>{rating[idx]>=4 ? '❤️':'⭕'}</button>
                                                <button onClick={() => handleRating(idx,5)} className='mr-2'>{rating[idx]>=5 ? '❤️':'⭕'}</button>
                                            </div> */}

                                        <div className='text-lg font-medium text-center border-2 text-white w-28 ml-3 pr-3'>
                                            {rv.date}
                                        </div>

                                        <div className='flex justify-end items-center text-white mt-1'>
                                            <React.Fragment>
                                                <Button review={rv} variant="outlined" onClick={(e) => handleClickOpen(e, rv.review_id, rv.content, rv.grade)}
                                                    style={{
                                                        backgroundColor: red[400],
                                                        fontWeight: "bold",
                                                        color: "white",
                                                        borderColor: red[400],
                                                        marginRight: "5px"
                                                    }}>
                                                    수정
                                                </Button>
                                                <Dialog
                                                    open={openModify}
                                                    onClose={handleClose}
                                                    PaperProps={{
                                                        component: 'form',
                                                        onSubmit: (e) => {
                                                            e.preventDefault();
                                                            onSubmit(selectedReviewId);
                                                            handleClose();
                                                        },
                                                    }}>
                                                    <DialogTitle>Modify</DialogTitle>
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
                                                            label="New Grade"
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
                                                            label="New Content"
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
                                        <div className='flex justify-end items-center text-white mt-1'>
                                            <React.Fragment>
                                                <Button review={rv} variant="outlined" onClick={(e) => handleClickOpenDelete(e, rv.review_id)}
                                                    style={{
                                                        backgroundColor: red[400],
                                                        fontWeight: "bold",
                                                        color: "white",
                                                        borderColor: red[400],
                                                        marginRight: "5px"
                                                    }}>
                                                    삭제
                                                </Button>
                                                <Dialog
                                                    open={openDelete}
                                                    onClose={handleClose}
                                                    aria-labelledby="alert-dialog-title"
                                                    aria-describedby="alert-dialog-description"
                                                    >
                                                    <DialogTitle id="alert-dialog-title">
                                                        Delete
                                                    </DialogTitle>
                                                    <DialogContent>
                                                        <DialogContentText id="alert-dialog-description">
                                                            해당 리뷰를 삭제하시겠습니까?
                                                        </DialogContentText>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button onClick={(e) => handleDelete(selectedDeleteId)}>삭제</Button>
                                                        <Button onClick={handleClose} autoFocus>취소</Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </React.Fragment>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
