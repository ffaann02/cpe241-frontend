import React, { useState } from 'react';
import { signupFields } from '../../constants/formfield';
import FormAction from './FormAction';
import Input from './LoginInput';

const fields = signupFields;

let fieldsState: { [key: string]: string } = {};

fields.forEach((field) => (fieldsState[field.id] = ''));

export default function Signup() {
    const [signupState, setSignupState] = useState<{ [key: string]: string }>(fieldsState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setSignupState({ ...signupState, [e.target.id]: e.target.value });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(signupState);
        createAccount();
    };

    //handle Signup API Integration here
    const createAccount = () => {
        // implementation goes here
    };

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="">
                {fields.map((field) => (
                    <Input
                        key={field.id}
                        handleChange={handleChange}
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
        </form>
    );
}
