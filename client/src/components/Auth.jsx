import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';

import signinImage from '../assets/signup.jpg';

const cookies = new Cookies();

const initialState = {
    fullName: "",
    userName: "",
    phoneNumber: "",
    avatharURL: "",
    password: "",
    confirmPassword: "",
}

const Auth = () => {
    const [isSignup, setisSignup] = useState(false);
    const [formData, setformData] = useState(initialState);

    const handleChange = (event) => {
        setformData({ ...formData, [event.target.name]: event.target.value })
    }

    const switchMode = () => {
        setisSignup((previsSignup) => !previsSignup);
    }

    const apicall = async (requestOptions, phoneNumber, avatharURL) => {
        try {

            const URL = 'https://medlinkbackend.onrender.com/auth';
            // const URL = 'http://localhost:5000/auth';
            // https://medlinkbackend.onrender.com

            // fetch datas from db
            const response = await fetch(`${URL}/${isSignup ? 'signup' : 'login'}`, requestOptions);
            const data = response.json();
            const { token, userId, fullName, userName, hashedPassword, message } = await data;
            if (message === 'INCORRECT_PASSWORD') {
                Swal.fire({
                    customClass: {
                        title: "reactanimTitle",
                        confirmButton: "reactanimifirmButton",
                    },
                    title:
                        "Incorrect password",
                    icon: "error",
                });
                return;
            }
            if (message === 'USER_NOT_FOUND') {
                Swal.fire({
                    customClass: {
                        title: "reactanimTitle",
                        confirmButton: "reactanimifirmButton",
                    },

                    title:
                        "User not found! <br><a id='createAccountLink'>Create an account</a>",
                    icon: "warning",
                    iconHtml: '!',
                }).then(() => {

                });
                const createAccountLink = document.getElementById("createAccountLink");
                createAccountLink.addEventListener("click", function (event) {
                    event.preventDefault();
                    setisSignup((previsSignup) => !previsSignup);
                    Swal.close();
                });
                return;
            }

            // stores the datas to cookies(local storage as cookies)
            if (token && token.length > 5) {
                cookies.set('token', token);
                cookies.set('userId', userId);
                cookies.set('fullName', fullName);
                cookies.set('userName', userName);

                if (isSignup) {
                    cookies.set('phoneNumber', phoneNumber);
                    cookies.set('avatharURL', avatharURL);
                    cookies.set('hashedPassword', hashedPassword);
                }

                window.location.reload();
            }

        }

        catch (error) {
            console.log(error)
            Swal.fire(
                {
                    title: 'Oops Something went wrong!',
                    text: 'Refused to connect server \n Check your connection',
                    html: ' <b>Refused to connect server</b> <br> \n Check your connection',
                    icon: 'error'
                }
            )
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { fullName, userName, password, phoneNumber, avatharURL } = formData;

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName,
                password,
                fullName,
                phoneNumber,
                avatharURL,
            }),
        };

        apicall(requestOptions, phoneNumber, avatharURL);
    };


    return (
        <>
            <div className="auth_wrapper_main">
                {/* left */}
                <div className="auth_wrapper_left_main">
                    <img src="3.jpg" alt="" />
                    <h3>Med<span>Link</span></h3>
                    <div className="auth_wrapper_left_welcome_div">
                        <div className="auth_wrapper_left_welcome_sub_div">
                            <h2>Welcome to <b>MedLink</b> </h2>
                            <p>Connect with your healthcare team in one place</p>
                        </div>
                    </div>
                </div>
                {/* right */}
                <div className="auth_wrapper_right_main">
                    <div className="auth_wrapper_right_mode_switch">
                        <div className="auth_wrapper_right_mode_sign_in">
                            <p>Sign in</p>
                        </div>
                        <div className="auth_wrapper_right_mode_create_account">
                            <p>Create Account</p>
                        </div>
                    </div>

                    <p className='auth_wrapper_right_form_title'>Sign in to your account to continue.</p>

                    {/* form */}
                    <form onSubmit={handleSubmit}>

                        <div className="auth_wrapper_right_form_input">
                            <label htmlFor="userName">User name</label>
                            <input
                                type="text"
                                name='userName'
                                id='userName'
                                placeholder='User name'
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="auth_wrapper_right_form_input">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input
                                type="text"
                                name='phoneNumber'
                                id='phoneNumber'
                                placeholder='Phone Number'
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="auth_wrapper_right_form_input">
                            <label htmlFor="avatharURL">Avathar URL</label>
                            <input
                                type="text"
                                name='avatharURL'
                                id='avatharURL'
                                placeholder='Avathar URL'
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="auth_wrapper_right_form_input">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name='password'
                                id='password'
                                placeholder='Password'
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="auth_wrapper_right_form_input">
                            <label htmlFor="confirmPassword" >Confirm Password</label>
                            <input
                                type="password"
                                name='confirmPassword'
                                id='confirmPassword'
                                placeholder='Confirm Password'
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="auth_wrapper_right_form_button">
                            <p>Sign in </p>
                            <p>Create Account</p>
                        </div>
                    </form>
                    <div className="auth_wrapper_right_footer">

                        <p>Already have an account?</p>
                        <p>Don\'t have an account? <span>Create Account</span></p>
                    </div>

                </div>

            </div>
        </>
    )


















    // return (
    //     <>
    //         <div className='auth__form-container'>
    //             <div className='auth__form-container_fields'>
    //                 <div className='auth__form-container_fields-content'>
    //                     <p>{isSignup ? 'Sign Up' : 'Sign In'}</p>
    //                     <form onSubmit={handleSubmit}>
    //                         {isSignup && (
    //                             <div className='auth__form-container_fields-content_input'>
    //                                 <label htmlFor="fullName">Full Name</label>
    //                                 <input

    //                                     type="text"
    //                                     name='fullName'
    //                                     id='fullName'
    //                                     placeholder='Full Name'
    //                                     onChange={handleChange}
    //                                     required
    //                                 />
    //                             </div>
    //                         )}
    //                         <div className='auth__form-container_fields-content_input'>
    //                             <label htmlFor="userName">User name</label>
    //                             <input
    //                                 type="text"
    //                                 name='userName'
    //                                 id='userName'
    //                                 placeholder='User name'
    //                                 onChange={handleChange}
    //                                 required
    //                             />
    //                         </div>
    //                         {isSignup && (
    //                             <div className='auth__form-container_fields-content_input'>
    //                                 <label htmlFor="phoneNumber">Phone Number</label>
    //                                 <input
    //                                     type="text"
    //                                     name='phoneNumber'
    //                                     id='phoneNumber'
    //                                     placeholder='Phone Number'
    //                                     onChange={handleChange}
    //                                     required
    //                                 />
    //                             </div>
    //                         )}
    //                         {isSignup && (
    //                             <div className='auth__form-container_fields-content_input'>
    //                                 <label htmlFor="avatharURL">Avathar URL</label>
    //                                 <input
    //                                     type="text"
    //                                     name='avatharURL'
    //                                     id='avatharURL'
    //                                     placeholder='Avathar URL'
    //                                     onChange={handleChange}
    //                                     required
    //                                 />
    //                             </div>
    //                         )}
    //                         <div className='auth__form-container_fields-content_input'>
    //                             <label htmlFor="password">Password</label>
    //                             <input
    //                                 type="password"
    //                                 name='password'
    //                                 id='password'
    //                                 placeholder='Password'
    //                                 onChange={handleChange}
    //                                 required
    //                             />
    //                         </div>
    //                         {isSignup && (
    //                             <div className='auth__form-container_fields-content_input'>
    //                                 <label htmlFor="confirmPassword" >Confirm Password</label>
    //                                 <input
    //                                     type="password"
    //                                     name='confirmPassword'
    //                                     id='confirmPassword'
    //                                     placeholder='Confirm Password'
    //                                     onChange={handleChange}
    //                                     required
    //                                 />
    //                             </div>
    //                         )}
    //                         <div className='auth__form-container_fields-content_button'>
    //                             <button>{isSignup ? 'Sign Up' : 'Sign In'}</button>
    //                         </div>
    //                     </form>
    //                     <div className='auth__form-container_fields-account'>
    //                         <p>{isSignup
    //                             ? 'Already have an account?'
    //                             : 'Don\'t have an account?'
    //                         }</p>
    //                         <span onClick={switchMode}>
    //                             {isSignup
    //                                 ? ' Sign In'
    //                                 : ' Sign Up'}
    //                         </span>
    //                     </div>
    //                 </div>
    //             </div>
    //             <div className='auth__form-container_image'>
    //                 <img src={signinImage} alt="sign in" />
    //             </div>
    //         </div>
    //     </>
    // )
}

export default Auth