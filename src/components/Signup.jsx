/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import imgLogin from '../../assets/images/login.png';
import routes from '../routes.js';

const Signup = () => {
  const { t } = useTranslation();

  const validationSchema = yup.object({
    username: yup.string().required(t('requiredField'))
      .min(3, t('signup.usernameLengthValidation'))
      .max(20, t('signup.usernameLengthValidation')),
    password: yup.string().required(t('requiredField'))
      .min(6, t('signup.passwordLength')),
    passwordConfirm: yup.string().oneOf([yup.ref('password'), null], t('signup.passwordsShouldMatch')),
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
      try {
        const response = await axios.post(routes.signupPath, values);
        localStorage.setItem('user', JSON.stringify(response.data));
        window.location.href = '/';
      } catch (error) {
        console.log(error.message);
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
  const feedbackStyle = {
    display: 'block',
  };

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
                  <Form.Label htmlFor="username">{t('yourLogin')}</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    autoComplete="username"
                    required
                    placeholder="Ваш ник"
                    id="username"
                    className="form-control"
                    isInvalid={formik.errors.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.username}
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
                    isInvalid={formik.errors.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
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
                    isInvalid={formik.errors.passwordConfirm}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.passwordConfirm}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.passwordConfirm}
                  </Form.Control.Feedback>
                </Form.Group>
                {authError && (
                <Form.Group className="form-floating mb-4">
                  <Form.Control.Feedback type="invalid" style={feedbackStyle}>
                    {authError}
                  </Form.Control.Feedback>
                </Form.Group>
                )}
                <button type="submit" className="w-100 mb-3 btn btn-outline-primary">{t('signup.signup')}</button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
