import { useState } from "react";

const useInputCreateQuiz = (validateValue:string, type:string) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [selectedId, setSelectedId] = useState<number>(0);
    const [isTouched, setIsTouched] = useState(false);
    let errorMessage = '';
    let hasError;
    let inputClass;
    const validityCheck = (attribute:string) => {
        let isValid = false;
        switch (attribute) {
            case 'topicName' :
                if(enteredValue.trim() !== '') {
                    isValid = true;
                } else {
                    errorMessage = 'Topic cannot be blank';
                }
                break;
            case 'description' :
                if(enteredValue.trim() !== '') {
                    isValid = true;
                } else {
                    errorMessage = 'Description cannot be Blank.';
                }
                break;
            case 'noOfQuestion' :
                if(enteredValue.trim() !== '') {
                    isValid = true;
                } else {
                    errorMessage = 'Please Enter number of questions.';
                }
                break;
            case 'marksPerQuestion' :
                if(selectedId != 0) {
                    console.log("isValid");
                    isValid = true;
                }
                else {
                    errorMessage = 'select marks per each question.';
                }
                break;
            default:
        }
        return isValid;
    }

    if(isTouched) {
        if(validityCheck(validateValue)) {
            console.log("id is valid input class")
            inputClass = 'form-control is-valid';
            hasError = false;
        } else {
            inputClass = 'form-control is-invalid';
            hasError = true;
        }
    } else {
        inputClass = 'form-control';
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

export default useInputCreateQuiz;