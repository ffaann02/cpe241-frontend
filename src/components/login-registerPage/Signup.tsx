import React, { useState } from 'react';
import { signupFields } from '../../constants/formfield';
import FormAction from './FormAction';
import Input from './LoginInput';
import { useNavigate } from 'react-router-dom';
import { axiosPrivate } from '../../api/axios';

const fields = signupFields;

let fieldsState: { [key: string]: string } = {};

fields.forEach((field) => (fieldsState[field.id] = ''));

export default function Signup() {
    const [signupState, setSignupState] = useState<{ [key: string]: string }>(fieldsState);
    const [ErrorMessage, setErrorMessage] = useState<string>('');
    const navigate = useNavigate();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setSignupState({ ...signupState, [e.target.id]: e.target.value });

    const handleResetError = () => {
        setErrorMessage('');
    };

    const checkForm = async () => {
        if (
            !signupState.firstname ||
            !signupState.lastname ||
            !signupState.email ||
            !signupState.password ||
            !signupState.phonenumber ||
            !signupState.confirmpassword
        ) {
            setErrorMessage('Please fill out all required fields');
            return false;
        } else if (!isValidEmail(signupState.email)) {
            setErrorMessage('Please enter a valid email address');
            return false;
        }
        // Check if password meets minimum length requirement
        else if (signupState.password.length < 8) {
            setErrorMessage('Password must be at least 8 characters long');
            return false;
        } else if (!isPasswordComplex(signupState.password)) {
            setErrorMessage(
                'Password must contain at least one uppercase letter, one lowercase letter, and one number'
            );
            return false;
        } else if (signupState.password !== signupState.confirmpassword) {
            setErrorMessage('Password does not match');
            return false;
        }
        return true;
    };

    const createAccount = async (): Promise<void> => {
        console.log('2');
        console.log('SignUp Success');
        try {
            console.log(signupState);
            const { confirmPassword, ...signupData } = signupState;
            const response = await axiosPrivate.post('/api/signup', {
                email: signupData.email,
                password: signupData.password,
                firstName: signupData.firstname,
                lastName: signupData.lastname,
                phoneNumber: signupData.phonenumber,
            });
            if (response.status === 200) {
                navigate('/login');
            } else {
                setErrorMessage('Error: Invalid email or password');
            }
        } catch (error) {
            // Handle error here, e.g. showing an error message
            console.error('An error occurred while trying to sign up:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(signupState);
        const isPass = await checkForm();
        if (!isPass) return;
        createAccount();
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
                {fields.map((field) => (
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
                ))}
                <FormAction handleSubmit={handleSubmit} text="Signup" />
            </div>
            <p className="text-red-500">{ErrorMessage}</p>
        </form>
    );
}
