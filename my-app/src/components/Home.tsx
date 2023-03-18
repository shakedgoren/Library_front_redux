import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { userLoginAsync, selectActive, logout, selectUserName } from '../slices/loginSlice';
import 'react-toastify/dist/ReactToastify.css';
import { Checkbox, Text } from "@nextui-org/react";
import myImage from '../LoginPage/images/myImage.jpg';
import myFavIcon from '../LoginPage/images/favicon.jpeg';
import "../LoginPage/css/main.css";
import "../LoginPage/css/util.css";
import "../LoginPage/fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "../LoginPage/fonts/font-awesome-4.7.0/css/font-awesome.css";
import "../LoginPage/fonts/iconic/css/material-design-iconic-font.min.css";
import "../LoginPage/fonts/iconic/css/material-design-iconic-font.css";
import book1 from '../LoginPage/images/book1.jpeg';
import book2 from '../LoginPage/images/book2.jpeg';
import book3 from '../LoginPage/images/book3.jpeg';
import book4 from '../LoginPage/images/book4.jpeg';
import book5 from '../LoginPage/images/book5.jpeg';
import book6 from '../LoginPage/images/book6.jpg';
import book7 from '../LoginPage/images/book7.jpeg';
import book8 from '../LoginPage/images/book8.jpeg';
import book9 from '../LoginPage/images/book9.jpeg';
import book10 from '../LoginPage/images/book10.jpeg';
import book11 from '../LoginPage/images/book11.jpeg';
import book12 from '../LoginPage/images/book12.jpeg';
import book13 from '../LoginPage/images/book13.jpeg';
import book14 from '../LoginPage/images/book14.jpeg';
import book15 from '../LoginPage/images/book15.jpg';
import book16 from '../LoginPage/images/book16.jpg';
import book17 from '../LoginPage/images/book17.jpg';
import book18 from '../LoginPage/images/book18.jpg';
import book19 from '../LoginPage/images/book19.jpg';
import book20 from '../LoginPage/images/book20.jpg';
import book21 from '../LoginPage/images/book21.jpg';

const Home = () => {
    const dispatch = useAppDispatch();
    const active = useAppSelector(selectActive)
    const user = useAppSelector(selectUserName)
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")

    const [rememberme, setrememberme] = useState(false)
    const myBooks: any[] = [{ id: 1, src: book1 }, { id: 2, src: book2 }, { id: 3, src: book3 }, { id: 4, src: book4 }, { id: 5, src: book5 }, { id: 6, src: book6 }, { id: 7, src: book7 }, { id: 8, src: book8 }, { id: 9, src: book9 }, { id: 10, src: book10 }, { id: 11, src: book11 }, { id: 12, src: book12 }, { id: 13, src: book13 }, { id: 14, src: book14 }, { id: 15, src: book15 }, { id: 16, src: book16 }, { id: 17, src: book17 }, { id: 18, src: book18 }, { id: 19, src: book19 }, { id: 20, src: book20 }, { id: 21, src: book21 }]

    useEffect(() => {
        localStorage.setItem("remember", JSON.stringify(rememberme))
    }, [rememberme])

    return (
        <div>
            {active ?
            <div style={{ gap: '2%', justifyContent: 'center', display:'flex'}}>
                <div style={{ gap: '2%', justifyContent: 'center'}}>
                    <div><Text size={50} css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%", fontFamily: 'Poppins-Regular' }} weight="bold">Hello {user}! </Text></div>
                    <div><Text size={30} css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%", fontFamily: 'Poppins-Regular' }} weight="bold">These are the books we have in the library,<br/>have a nice day!<br/></Text></div>
                    <div style={{ display: 'flex', gap: '2%', justifyContent: 'center'}}>
                        <div id="carouselExampleCaptions" style={{ maxHeight: '500px', minHeight: '500px', maxWidth: '300px' }} className="carousel slide" data-bs-ride="false">
                            <div className="carousel-inner" >
                                {myBooks.map((book, i) =>
                                    <div className={`carousel-item ${i === 0 ? "active" : ""}`}>
                                        <img src={book.src} className="d-block w-100" alt="book" />
                                        <div className="carousel-caption d-none d-md-block">
                                        </div>
                                    </div>)}
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>
                </div>
                :
                <div>
                    <div className='limiter'>
                        <div className='container-login100' style={{ backgroundImage: `url(${myImage})` }}>
                            <div className='wrap-login100'>
                                <form className='login100-form validate-form'>
                                    <span className='login100-form-logo'>
                                        <i className='zmdi zmdi-landsca' />
                                    </span>
                                    <span className='login100-form-title p-b-34 p-t-27'>
                                        Login
                                    </span>
                                    <div className='wrap-input100 validate-input' data-validate="Enter username">
                                        <input className='input100' type="text" placeholder="Username" onChange={(e) => setusername(e.target.value)} />
                                        <span className='focus-input100' data-placeholder="&#xf207;"></span>
                                    </div>
                                    <div className='wrap-input100 validate-input' data-validate="Enter password">
                                        <input className='input100' type="password" placeholder="Password" onChange={(e) => setpassword(e.target.value)} />
                                        <span className='focus-input100' data-placeholder="&#xf191;"></span>
                                    </div>
                                    <div className='contact100-form-checkbox'>
                                        <input className='input-checkbox100' type="checkbox" />
                                        <Checkbox size='sm' color="success" onChange={(e) => setrememberme(!rememberme)}>Remember me</Checkbox>
                                    </div>
                                    <div className='container-login100-form-btn'>
                                        <button type='button' className='login100-form-btn' onClick={() => dispatch(userLoginAsync({ username, password }))}>Login</button>
                                    </div>
                                    <div className='text-center p-t-90'>
                                        <a className='txt1'>Forgot Password?<br />please contact the computer department<br />052-2884992</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>}
        </div>
    );
}

export default Home
