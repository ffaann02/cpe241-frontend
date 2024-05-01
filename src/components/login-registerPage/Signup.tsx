import React, { useState } from 'react';
import { signupFields } from "../../constants/formfield";
import FormAction from "./FormAction";
import Input from "./LoginInput";
import { useNavigate } from 'react-router-dom';

const fields = signupFields;

let fieldsState: { [key: string]: string } = {};

fields.forEach(field => fieldsState[field.id] = '');

export default function Signup() {
    const [signupState, setSignupState] = useState<{ [key: string]: string }>(fieldsState);
    const [ErrorMessage, setErrorMessage] = useState<string>('');
    const navigate = useNavigate();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setSignupState({ ...signupState, [e.target.id]: e.target.value });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(signupState);
        createAccount();
    }
    const handleResetError = () => {
        setErrorMessage('');
    }

    //handle Signup API Integration here
    const createAccount = () => {
        if (!signupState.firstname || !signupState.lastname|| !signupState.email || !signupState.password || !signupState.phonenumber || !signupState.confirmpassword) {
            setErrorMessage("Please fill out all required fields");
            return;
        }
        else if (!isValidEmail(signupState.email)) {
            setErrorMessage("Please enter a valid email address");
            return;
        }
        // Check if password meets minimum length requirement
        else if (signupState.password.length < 8) {
            setErrorMessage("Password must be at least 8 characters long");
            return;
        }

        // Check if email is valid
        // Check if username is already taken
        // if (isUsernameTaken(signupState.username)) {
        //     setErrorMessage("Username is already taken");
        //     return;
        // }

        // Check if required fields are filled out
        else if (!isPasswordComplex(signupState.password)) {
            setErrorMessage("Password must contain at least one uppercase letter, one lowercase letter, and one number");
            return;
        }

        else if (signupState.password !== signupState.confirmpassword) {
            setErrorMessage("Password does not match");
            return;
        }
        console.log("SignUp Success")
        navigate('/login')

        // If all checks pass, proceed with account creation
        //createUserAccount(signupState);
    };

    // Helper function for email validation
    function isValidEmail(email: string): boolean {
        // Implement email validation logic here
        // Example: using a regular expression
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(email);
    }
    function isPasswordComplex(password: string): boolean {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        return hasUpperCase && hasLowerCase && hasNumber;
    }

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="">
                {
                    fields.map(field =>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            handleResetError={handleResetError}
                            value={signupState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                        />
                    )
                }
                <FormAction handleSubmit={handleSubmit} text="Signup" />
            </div>
            <p className="text-red-500" >{ErrorMessage}</p>
        </form>
    )
}