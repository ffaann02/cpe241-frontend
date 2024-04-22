import React, { useState } from 'react';
import { loginFields } from "../../constants/formfield";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./LoginInput";

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
fields.forEach(field => fieldsState[field.id] = '');

interface LoginState {
  [key: string]: string;
}

const Login: React.FC = () => {
  const [loginState, setLoginState] = useState<LoginState>(fieldsState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    authenticateUser();
  };

  // Handle Login API Integration here
  const authenticateUser = (): void => {
    // Add your authentication logic here
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="-space-y-px">
        {fields.map(field => (
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