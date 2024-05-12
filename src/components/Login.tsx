import React, { useState } from 'react';
import { loginFields } from '../constants/formfield';
import FormAction from './FormAction';
import FormExtra from './FormExtra';
import Input from './LoginInput';
import axios from 'axios';

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

const Login: React.FC = () => {
    const [loginState, setLoginState] = useState<LoginState>(fieldsState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setLoginState({ ...loginState, [e.target.id]: e.target.value });
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    authenticateUser();
  };


    const setAuthTokens = (data: { token: string }) => {
        if (data.token) {
            axios.defaults.headers.common['Authorization'] =
                `Bearer ${data.token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    };

    // Handle Login API Integration here
    async function authenticateUser() {
        try {
            const response = await axios.post('http://localhost:3000/api/login', {
                email: loginState.email,
                password: loginState.password,
            });
            localStorage.setItem('token', response.data.token);
            setAuthTokens(response.data);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
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
        </form>
    );
};

export default Login;
