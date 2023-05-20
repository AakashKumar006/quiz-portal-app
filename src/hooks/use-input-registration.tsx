import { useState } from "react";

const useInputRegistration = (validateValue:string, type:string) => {
    const stringRegex = new RegExp('^[A-Za-z]+$');
    const passwordRegex = new RegExp('^.{6,15}$');
    const phoneNoRegex = new RegExp('^(\\+91-|\\+91|0)?\\d{10}$');
    const [enteredValue, setEnteredValue] = useState('');
    const [selectedId, setSelectedId] = useState<number>(0);
    const [isTouched, setIsTouched] = useState(false);

    let errorMessage = '';
    let hasError;
    let inputClass;
    const validityCheck = (attribute:string) => {
        let isValid = false;
        switch (attribute) {
            case 'firstName' :
                if(enteredValue.trim() !== '') {
                    if(stringRegex.test(enteredValue)){
                        isValid = true;
                    } else {
                        errorMessage = "first name should be alphabet only";
                    }
                } else {
                    errorMessage = 'please enter first name';
                }
                break;
            case 'lastName' :
                if(enteredValue.trim() !== '') {
                    if(stringRegex.test(enteredValue)){
                        isValid = true;
                    } else {
                        errorMessage = "Last name should be alphabet only";
                    }
                } else {
                    errorMessage = 'please enter last name';
                }
                break;

            case 'email' :
                if(enteredValue.trim() !== '') {
                    isValid = true;
                } else {
                    errorMessage = 'please enter email';
                }
                break;
            case 'password' :
                if(enteredValue.trim() !== '') {
                    if(passwordRegex.test(enteredValue)){
                        isValid = true;
                    } else {
                        errorMessage = "Password must contain 6 to 15 character long";
                    }

                } else {
                    errorMessage = 'Please enter password.';
                }
                break;


            case 'dateOfBirth' :
                if(enteredValue.trim() !== '') {
                    //candidate birth date;
                    const birthDate = new Date(enteredValue);
                    // current date:
                    const currentDate = new Date();
                    // if today_month > then dob_month -> age--
                    var age : number = currentDate.getFullYear() - birthDate.getFullYear();
                    var month = currentDate.getMonth() - birthDate.getMonth();
                    var date = currentDate.getDate() - birthDate.getDate();
                    if(month >= 0 && date >= 0)  {
                        age--
                    }
                    if(age > 18) {
                        isValid = true;
                    } else {
                        errorMessage = 'Age should be a greater then 18';
                    }
                } else {
                    errorMessage = 'Age must not be empty.';
                }
                break;


            case 'phoneNo' :
                if(enteredValue.trim() !== '') {
                    if(phoneNoRegex.test(enteredValue)){
                        isValid = true;
                    } else {
                        errorMessage = "Invalid Phone number";
                    }
                } else {
                    errorMessage = 'Phone number cannot be empty';
                }
                break;
                
            case 'region' :
                if(selectedId != 0) {
                    isValid = true;
                }
                break;
            default:

        }
        return isValid;
    }

    if(isTouched) {
        if(validityCheck(validateValue)) {
            if(type === 'string') {
                inputClass = 'form-control is-valid';
            } else {
                inputClass = 'form-control form-control-sm is-valid';
            }
            hasError = false;
        } else {
            if(type === 'string'){
                inputClass = 'form-control is-invalid';
            } else {
                inputClass =  'form-control form-control-sm is-invalid';
            }

            hasError = true;
        }
    } else {
        if(type === 'string') {
            inputClass = 'form-control';
        } else {
            inputClass =  'form-control form-control-sm';
        }
        hasError = undefined;
    }

    const valueChangedHandler = (e:any) => {
        setIsTouched(true);
        setEnteredValue(e.target.value);
        setSelectedId(e.target.value);
    };

    const inputBlurHandler = () => {
        setIsTouched(true);
    };

    const reset = () => {
        setEnteredValue('');
        setIsTouched(false);
    };

    const resetId = () => {
        setSelectedId(0);
        setIsTouched(false);
    };

    return {
        id: selectedId,
        value: enteredValue,
        hasError,
        valueChangedHandler,
        inputBlurHandler,
        inputClass,
        resetId,
        reset,
        errorMessage
    };
}

export default useInputRegistration;