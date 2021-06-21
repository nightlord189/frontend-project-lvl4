/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import imgLogin from '../../assets/images/login.png';
import routes from '../routes.js';
import { AuthContext } from '../context';

const Login = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [, setAuth] = useContext(AuthContext);

  const validationSchema = yup.object({
    username: yup.string().required(t('login.requiredField')),
    password: yup.string().required(t('login.requiredField')),
  });

  const [formError, setformError] = useState('');
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      // console.log(`login submit: ${JSON.stringify(values)}`);
      try {
        const response = await axios.post(routes.authPath, values);
        localStorage.setItem('user', JSON.stringify(response.data));
        setAuth(JSON.stringify(response.data));
        // console.log(`login success: ${JSON.stringify(response.data)}`);
        history.push('/');
      } catch (error) {
        // console.log(`login failure: ${error}`);
        if (error.message.indexOf('401') !== -1) {
          setformError(t('login.wrongCredentials'));
        } else {
          setformError(error.message);
        }
      }
    },
  });
  return (
    <div className="container-fluid flex-grow-1">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-xl-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div><img src={imgLogin} className="rounded-circle" alt={t('login.login')} width="200" height="200" /></div>
              <form className="w-50" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('login.login')}</h1>
                <Form.Group className="form-floating mb-4">
                  <Form.Label htmlFor="username">{t('yourLogin')}</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    autoComplete="username"
                    required
                    placeholder="Ваш ник"
                    id="username"
                    className="form-control"
                    isInvalid={formError}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                  />
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Label htmlFor="password">{t('password')}</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    required
                    placeholder="Пароль"
                    id="password"
                    className="form-control"
                    isInvalid={formError}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  {formError ?? (
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formError}
                  </Form.Control.Feedback>
                  )}
                </Form.Group>
                <button type="submit" className="w-100 mb-3 btn btn-outline-primary" disabled={formik.isSubmitting}>{t('login.login')}</button>
              </form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('login.noAccount')}</span>
                {' '}
                <Link to="/signup">{t('signupTitle')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
