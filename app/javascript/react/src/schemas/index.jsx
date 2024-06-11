import * as Yup from 'yup';

export const signupSchema = Yup.object({
    name: Yup.string().min(2).max(50).required("Please enter your name"),
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(6).required("Please enter your password"),
    password_confirmation: Yup.string().required("this field is required").oneOf([Yup.ref('password'), null], 'Passwords must match'),
    user_type: Yup.string().required("Please enter your user type"),
})

export const signinSchema = Yup.object({
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().required("Please enter your password"),
})