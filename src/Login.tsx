import React, {useEffect, useState } from "react";
import { IQuizUserAuthCreadential } from "./IQuizUserAuthCreadential";
import {useNavigate} from "react-router-dom"
import './Login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useInput from './hooks/use-input-login';


const Login = () => {
    const navigate = useNavigate();


    // form validation
    const {
        value: email,
        hasError: emailHasError,
        valueChangedHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        inputClass: emailInputClass,
        errorMessage: emailErrorMessage
    } = useInput("email","string");

    const {
        value: password,
        hasError: passwordHasError,
        valueChangedHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        inputClass: passwordInputClass,
        errorMessage: passwordErrorMessage
    } = useInput("password","string");

    const userAuthCreadentialCall = (loginAuthCredential: IQuizUserAuthCreadential) => {
        fetch('http://localhost:8080/userLogin',{
            method: 'POST',
            headers: {
                'content-type' : 'application/json',
            },
            body: JSON.stringify(loginAuthCredential)
        }).then(response => response.json())
            .then(response => {

                console.log("status"+response);
                if(response.status === undefined) {
                    console.log(response.userEmail);
                    sessionStorage.setItem("name",response.userEmail);
                    sessionStorage.setItem("role",response.userRole);
                    sessionStorage.setItem("password",password)
                    console.log("respone ::: "+response.userId)
                    alert(response.userId);
                    sessionStorage.setItem("id",response.userId)
                    sessionStorage.setItem("authenticate","true");
                    navigate('/dashboard');
                } else {
                    console.log("status"+response);
                    toast.error(response.message, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });

                }
            })
    }

    let formIsValid = false;
    if(
        emailHasError === false &&
        passwordHasError === false) {
        formIsValid = true;
    }

    const loginFormSubmitHandler = (event:any) => {
        event.preventDefault();
        if(!formIsValid) {
            return;
        }
        const candidateRecruitmentFormData: IQuizUserAuthCreadential = {
            userEmail: email,
            userPassword: password
        }
        userAuthCreadentialCall(candidateRecruitmentFormData);
    }

    const openRegisterFormHandler = () => {
        navigate('/register');
    }

    const userAuthSuccess = () => {
        navigate('/dashboard');
    }

    return(
        <div className="Login-form">
            <div className="auth-form-container">
                <h2>Login To Quiz</h2>
                <form className="login-form" onSubmit={loginFormSubmitHandler}>
                    <label>email</label>
                    <input value={email} type="email" placeholder="Enter your email" className={emailInputClass} onChange={emailChangeHandler} onBlur={emailBlurHandler}/>
                    {emailHasError && <small className="text-white bg-dark">{emailErrorMessage}</small>}
                    <label>password</label>
                    <input value={password} type="password" placeholder="********" className={passwordInputClass} onChange={passwordChangeHandler} onBlur={passwordBlurHandler}/>
                    {passwordHasError && <small className="text-white bg-dark">{passwordErrorMessage}</small>}
                    <button className="button-btn" disabled={!formIsValid}>Log In</button>
                </form>
                <button className="link-btn" onClick={openRegisterFormHandler}>Don't have an account? Register here,</button>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Login;