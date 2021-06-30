/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import imgLogin from '../../assets/images/login.png';
import routes from '../routes.js';
import { AuthContext } from '../context';

const Signup = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const auth = useContext(AuthContext);

  const getErrorText = (key) => (key ? t(`signup.${key}`) : '');

  const validationSchema = yup.object({
    username: yup.string().required('requiredField')
      .min(3, 'usernameLengthValidation')
      .max(20, 'usernameLengthValidation'),
    password: yup.string().required('requiredField')
      .min(6, 'passwordLength'),
    passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'passwordsShouldMatch'),
  });

  const [formState, setFormState] = useState({
    authError: null,
  });
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      // console.log(`signup submit: ${JSON.stringify(values)}`);
      try {
        const response = await axios.post(routes.signupPath, values);
        auth.login(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        // console.log(`signup success: ${JSON.stringify(response.data)}`);
        history.push('/');
      } catch (error) {
        // console.log(`signup failure: ${error}`);
        if (error.message.indexOf('409') !== -1) {
          setFormState({
            authError: t('signup.error'),
          });
        } else {
          setFormState({
            authError: error.message,
          });
        }
      }
    },
  });

  const { authError } = formState;

  return (
    <div className="container-fluid flex-grow-1">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-xl-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div><img src={imgLogin} className="rounded-circle" alt={t('signupTitle')} width="200" height="200" /></div>
              <Form noValidate className="w-50" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('signupTitle')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Label htmlFor="username">{t('signup.username')}</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    autoComplete="username"
                    required
                    placeholder={t('signup.username')}
                    id="username"
                    className="form-control"
                    isInvalid={authError || formik.errors.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {getErrorText(formik.errors.username)}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Label htmlFor="password">{t('password')}</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    required
                    placeholder="Пароль"
                    id="password"
                    className="form-control"
                    isInvalid={authError || formik.errors.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {getErrorText(formik.errors.password)}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Label htmlFor="passwordConfirm">{t('signup.confirmPassword')}</Form.Label>
                  <Form.Control
                    type="password"
                    name="passwordConfirm"
                    autoComplete="current-password"
                    required
                    placeholder="Пароль"
                    id="passwordConfirm"
                    className="form-control"
                    isInvalid={authError || formik.errors.passwordConfirm}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.passwordConfirm}
                  />
                  <Form.Control.Feedback type="invalid">
                    {authError || getErrorText(formik.errors.passwordConfirm)}
                  </Form.Control.Feedback>
                </Form.Group>
                <button type="submit" className="w-100 mb-3 btn btn-outline-primary" disabled={formik.isSubmitting}>{t('signup.signup')}</button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
