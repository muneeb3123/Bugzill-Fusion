import React from 'react';
import AuthForm from './AuthForm';

const SignUp = () => {
  const signUpInputFields = [
    {
      type: 'text', name: 'name', placeholder: 'Username', iconClass: 'bx bx-user input-icon',
    },
    {
      type: 'email', name: 'email', placeholder: 'E-mail', iconClass: 'bx bx-envelope input-icon',
    },
    {
      type: 'password', name: 'password', placeholder: 'Password', iconClass: 'bx bx-lock-alt input-icon',
    },
    {
      type: 'password', name: 'password_confirmation', placeholder: 'confirm password', iconClass: 'bx bx-lock-alt input-icon',
    },
  ];

  return (
    <AuthForm
      title="Hello, friend!"
      buttonText="CREATE ACCOUNT"
      message="Already have an account? Signin"
      inputFields={signUpInputFields}
      showCheckbox
      welcomeMsg="Glad to see you!"
      welcomeDetail="Congratulations on taking the first step! Get ready for a thrilling journey filled with new experiences and opportunities."
      formType="signup"
      user_type = 'developer'
    />
  );
};

export default SignUp;
