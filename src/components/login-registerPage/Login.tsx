import React, { useState } from 'react';
import { loginFields } from '../../constants/formfield';
import FormAction from './FormAction';
import FormExtra from './FormExtra';
import Input from './LoginInput';
import { useNavigate } from 'react-router-dom';
import axiosPrivate from '../../api/axios';
import useAuth from '../../hooks/useAuth';

interface Field {
    id: string;
    labelText: string;
    labelFor: string;
    name: string;
    type: string;
    isRequired: boolean;
    placeholder: string;
}

const fields: Field[] = loginFields;
let fieldsState: { [key: string]: string } = {};
fields.forEach((field) => (fieldsState[field.id] = ''));

interface LoginState {
    [key: string]: string;
}

interface LoginProps {
    isFetching: boolean;
    setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({ setIsFetching }: LoginProps) => {
    const [loginState, setLoginState] = useState<LoginState>(fieldsState);
    const navigate = useNavigate();
    const [ErrorMessage, setErrorMessage] = useState<string>('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setLoginState({ ...loginState, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        authenticateUser();
    };

    const { setAuth } = useAuth();

    // Handle Login API Integration here
    const authenticateUser = async (): Promise<void> => {
        try {
            setIsFetching(true);
            const response = await axiosPrivate.post('/api/login', loginState);
            if (response.status === 200) {
                setIsFetching(false);
                setAuth({
                    userid: response.data.userid,
                    role: response.data.role,
                    firstName: response.data.firstName,
                    email: response.data.email,
                });
                localStorage.setItem('auth', JSON.stringify(response.data));
                navigate('/');
            } else {
                setErrorMessage('Error: Invalid email or password');
            }
        } catch (error) {
            // Handle error here, e.g. showing an error message
            console.error('An error occurred while trying to log in:', error);
        }
    };

    return (
        <form className="" onSubmit={handleSubmit}>
            <div className="">
                {fields.map((field) => (
                    <Input
                        key={field.id}
                        handleChange={handleChange}
                        value={loginState[field.id]}
                        labelText={field.labelText}
                        labelFor={field.labelFor}
                        id={field.id}
                        name={field.name}
                        type={field.type}
                        isRequired={field.isRequired}
                        placeholder={field.placeholder}
                    />
                ))}
            </div>
            <FormExtra />
            <FormAction handleSubmit={handleSubmit} text="Login" />
            <p className="text-red-500">{ErrorMessage}</p>
        </form>
    );
};

export default Login;
