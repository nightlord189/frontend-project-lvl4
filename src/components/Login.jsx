/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import imgLogin from '../../assets/images/login.png';

const validationSchema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const Login = () => {
  const [formError, setformError] = useState('');
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('/api/v1/login', values);
        localStorage.setItem('userToken', response.data.token);
        window.location.href = '/';
      } catch (error) {
        console.log(error.message);
        if (error.message.indexOf('401') !== -1) {
          setformError('Неверные имя пользователя или пароль');
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
              <div><img src={imgLogin} className="rounded-circle" alt="Войти" width="200" height="200" /></div>
              <form className="w-50" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">Войти</h1>
                <Form.Group className="form-floating mb-4">
                  <Form.Label htmlFor="username">Ваш ник</Form.Label>
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
                  <Form.Label htmlFor="password">Пароль</Form.Label>
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
                <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
              </form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span>
                {' '}
                <a href="/signup">Регистрация</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
