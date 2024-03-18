import { useFormik } from 'formik';
import React, { FC, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useSignUpMutationQuery } from '../../../fullStore/combos/user/userQueries';
import { selectEncryptedEmail, setErrorMessage, setIsLoading } from '../../../fullStore/combos/user/userSlice';
import { useAppDispatch } from '../../../fullStore/hooks';
import { setIsEmailVerifiedCallbackType } from '../../../types/callbacks';
import { EmailVerifyingPage } from '../EmailVerifyingPage/EmailVerifyingPage';
import { signUpvalidationSchema } from './signUpValidation';

const initialValues: initialValuesType = {
    name: '',
    password: '',
    passwordConfirm: ''
};

export const SignUpPage: FC<{}> = () => {

    const [isEmailVerified, setIsEmailVerified] = useState(false); // Костыль
    
    const [signUp] = useSignUpMutationQuery();
    let encryptedEmail = useSelector(selectEncryptedEmail);
    const navigate = useNavigate();

    const usualDispatch = useAppDispatch();

    const submitHandler = useCallback((values: initialValuesType) => {
        usualDispatch(setIsLoading(true));

        signUp({
            encryptedEmail,
            name: values.name,
            password: values.password
        }).unwrap()
            .then((fulfilled: { message: string }) => {
                usualDispatch(setErrorMessage(fulfilled.message))
                navigate("/");
            })
            .catch((e: any) => usualDispatch(setErrorMessage(e.data.message)));
        usualDispatch(setIsLoading(false));
    }, [encryptedEmail]);

    const setIsEmailVerifiedCallback: setIsEmailVerifiedCallbackType =
        (isVerified) => {
            setIsEmailVerified(prev => prev = isVerified);
        };

    const formik = useFormik({
        initialValues,
        validationSchema: signUpvalidationSchema,
        onSubmit: submitHandler
    });

    return (
        <div>
            {
                !isEmailVerified ?
                    <div>Verif</div>
                    <EmailVerifyingPage
                        setIsEmailVerifiedCallback={setIsEmailVerifiedCallback}
                        removeBackArrow={true}
                    />
                    :
                    <div>
                        <form onSubmit={formik.handleSubmit}>
                                <input
                                    placeholder='name'
                                />
                                <input
                                    placeholder='password'
                                    name="passwordConfirm"
                                />
                                <input
                                    placeholder='passwordConfirms'
                                    name="passwordConfirm"
                                />
                                <button type="submit">Submit</button>
                            </form>
                                <div>
                                    By pressing Submit, you agree to the
                                    <Link
                                        to="/signIn">Terms of Service
                                    </Link>
                                    and
                                    <Link
                                        to="/signIn">Privacy Policy
                                    </Link>
                                </div>
                    </div>
            }
            <span>Already have an account?</span>
            <Link to="/signIn">Sign in</Link>

        </div>
    )
};

type initialValuesType = {
    name: string
    password: string,
    passwordConfirm: string
};