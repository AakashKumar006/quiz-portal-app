import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useInput from "./hooks/use-input-registration";
import { IQuizUserRegistration } from "./IQuizUserRegistration";
import './UserRegistrationForm.css';


export const Register = () => {


    const navigate = useNavigate();
    const openLoginFormHandler = () => {
        navigate("/login");
    }

    // form validation first name
    const {
        value: firstName,
        hasError: firstNameHasError,
        valueChangedHandler: firstNameChangeHandler,
        inputBlurHandler: firstNameBlurHandler,
        inputClass: firstNameInputClass,
        errorMessage: firstNameErrorMessage
    } = useInput("firstName","string");

    // form validation last name
    const {
        value: lastName,
        hasError: lastNameHasError,
        valueChangedHandler: lastNameChangeHandler,
        inputBlurHandler: lastNameBlurHandler,
        inputClass: lastNameInputClass,
        errorMessage: lastNameErrorMessage
    } = useInput("lastName","string");


    // form validation email
    const {
        value: email,
        hasError: emailHasError,
        valueChangedHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        inputClass: emailInputClass,
        errorMessage: emailErrorMessage
    } = useInput("email","string");

    // form validation date of birth
    const {
        value: dateOfBirth,
        hasError: dateOfBirthHasError,
        valueChangedHandler: dateOfBirthChangeHandler,
        inputBlurHandler: dateOfBirthBlurHandler,
        inputClass: dateOfBirthInputClass,
        errorMessage: dateOfBirthErrorMessage
    } = useInput("dateOfBirth","string");

    // form validation Phone number
    const {
        value: phoneNo,
        hasError: phoneNoHasError,
        valueChangedHandler: phoneNoChangeHandler,
        inputBlurHandler: phoneNoBlurHandler,
        inputClass: phoneNoInputClass,
        errorMessage: phoneNoErrorMessage
    } = useInput("phoneNo","string");

    // form validation password
    const {
        value: password,
        hasError: passwordHasError,
        valueChangedHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        inputClass: passwordInputClass,
        errorMessage: passwordErrorMessage
    } = useInput("password","string");



    const userRegistration = (loginAuthCredential: IQuizUserRegistration) => {
        fetch('http://localhost:8080/registration',{
            method: 'POST',
            headers: {
                'content-type' : 'application/json',
            },
            body: JSON.stringify(loginAuthCredential)
        }).then(response => response.json())
            .then(response => {
                if(response.status === undefined) {
                    console.log(response.userEmail);
                    sessionStorage.setItem("name",response.userEmail);
                    sessionStorage.setItem("role",response.userRole);
                    sessionStorage.setItem("authenticate","true");
                    navigate('/dashboard');
                } else {
                    toast.error(response.detail, {
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
        firstNameHasError === false &&
        lastNameHasError === false &&
        emailHasError == false &&
        dateOfBirthHasError == false &&
        phoneNoHasError == false &&
        passwordHasError === false) {
        formIsValid = true;
    }
    
    const handleSubmit = (e:any) => {
        e.preventDefault();
        if(!formIsValid) {
            return;
        }
        const quizUserRegistration: IQuizUserRegistration = {
            userFirstName: firstName,
            userLastName: lastName,
            userEmail: email,
            userPhoneNo: phoneNo,
            userPassword: password,
            userDateOfBirth: dateOfBirth
        }
        userRegistration(quizUserRegistration);
         

    }

    return (
        <div className="register-form">
            <div className="auth-form-container">
                <h2>Quiz Application Registration</h2>
                <form  onSubmit={handleSubmit}>
                    <div className="box">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="form-group">
                                    <label><span className="required">*</span><strong>First Name</strong></label>
                                    <input value={firstName} placeholder="Enter First Name" className={firstNameInputClass} onChange={firstNameChangeHandler} onBlur={firstNameBlurHandler}/>
                                    {firstNameHasError && <strong><small className="text-dark">{firstNameErrorMessage}</small></strong>}
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="form-group">
                                    <label><span className="notRequired"/><strong>Middle Name</strong></label>
                                    <input placeholder="Enter Middle Name" className="form-control"/>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="form-group">
                                    <label><span className="required"/><strong>Last Name</strong></label>
                                    <input value={lastName} placeholder="Enter Last Name" className={lastNameInputClass} onChange={lastNameChangeHandler} onBlur={lastNameBlurHandler}/>
                                    {lastNameHasError && <strong><small className="text-dark">{lastNameErrorMessage}</small></strong>}
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="form-group">
                                    <label><span className="required"/><strong>Email</strong></label>
                                    <input value={email} placeholder="abc@mail.com" className={emailInputClass} onChange={emailChangeHandler} onBlur={emailBlurHandler}/>
                                    {emailHasError && <strong><small className="text-dark">{emailErrorMessage}</small></strong>}
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="form-group">
                                    <label><span className="required"/><strong>Date of Birth</strong></label>
                                    <input value={dateOfBirth} placeholder="Enter Date of Birth" type="Date" className={dateOfBirthInputClass} onChange={dateOfBirthChangeHandler} onBlur={dateOfBirthBlurHandler}/>
                                    {dateOfBirthHasError && <strong><small className="text-dark">{dateOfBirthErrorMessage}</small></strong>}
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="form-group">
                                    <label><span className="required"/><strong>Phone Number</strong></label>
                                    <input value={phoneNo} placeholder="Enter Phone No" className="form-control" onChange={phoneNoChangeHandler} onBlur={phoneNoBlurHandler}/>
                                    {phoneNoHasError && <strong><small className="text-dark">{phoneNoErrorMessage}</small></strong>}
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="form-group">
                                    <label><span className="required"/><strong>Gender</strong></label>
                                    <select className="form-control" >
                                        <option value={0}>Select Gender</option>
                                        <option value="1">Male</option>
                                        <option value="2">Female</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="form-group">
                                    <label><span className="required"/><strong>Password</strong></label>
                                    <input value={password} placeholder="Enter Password" className="form-control" onChange={passwordChangeHandler} onBlur={passwordBlurHandler}/>
                                    {passwordHasError && <strong><small className="text-dark">{passwordErrorMessage}</small></strong>}
                                </div>
                            </div>
                        </div>
                        <button className="button-btn" disabled={!formIsValid} type="submit">Register</button>
                    </div>
                </form>
                <button className="link-btn" onClick={openLoginFormHandler}>Already have an account? Login here.</button>
            </div>
        </div>
    )
}


