import React, { useState } from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'

import LoginImg from '../assets/login_img.svg'

const cookies = new Cookies();

const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    avatarURL: '',
    phoneNumber: '',
}

const Auth = () => {

    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { fullName, username, password, phoneNumber, avatarURL } = form;

        // const URL = 'http://localhost:5000/auth';
        const URL = 'https://still-thicket-33329.herokuapp.com/auth';

        const { data: { token, userId, hashedPassword } } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
            username, password, fullName: form.fullName, phoneNumber, avatarURL,
        });

        cookies.set('token', token);
        cookies.set('username', username);
        cookies.set('fullName', fullName);
        cookies.set('userId', userId);

        if (isSignup) {
            cookies.set('phoneNumber', phoneNumber);
            cookies.set('avatarURL', avatarURL);
            cookies.set('hashedPassword', hashedPassword);
        }

        window.location.reload();
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }

    return (
        <div className="auth__form-container">
            <div className="auth__form-container_image">
                <img src={LoginImg} alt="Chat" />
            </div>
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <p>{isSignup ? 'Sign Up' : 'Login'}</p>
                    <form onSubmit={handleSubmit}>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <input type="text" name="username" placeholder="Username (what others will see)" onChange={handleChange} required />
                        </div>
                        <div className="auth__form-container_fields-content_input">
                            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                        </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
                            </div>
                        )}
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <input type="text" name="avatarURL" placeholder="URL for avatar image" onChange={handleChange} />
                            </div>
                        )}
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <input type="phone" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_button">
                            <button type="submit">{isSignup ? "Register" : "Sign in"}</button>
                        </div>
                    </form>
                    <div className="auth__form-container_fields-account">
                        <p>
                            {isSignup ? "Already have an account?" : "Don't have an account?"}
                            <br />
                            <br />
                            <span onClick={switchMode}>{isSignup ? "Login": "Sign Up"}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth
