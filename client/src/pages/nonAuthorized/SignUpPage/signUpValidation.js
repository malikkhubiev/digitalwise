import * as yup from 'yup';

export const signUpvalidationSchema = yup.object({
    name: yup
        .string('Enter your name')
        .min(1, "Too short")
        .max(150, "Too long")
        .required('Name is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    passwordConfirm: yup
        .string('Enter your password')
        .oneOf([yup.ref('password'), null], 'Passwords must match')
});