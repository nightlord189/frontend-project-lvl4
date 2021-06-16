/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import imgLogin from '../../assets/images/login.png';
import routes from '../routes.js';

const validationSchema = yup.object({
  username: yup.string().required('Обязательное поле')
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов'),
  password: yup.string().required('Обязательное поле')
    .min(6, 'Не менее 6 символов'),
  passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
});

const Signup = () => {
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
            authError: 'Ошибка регистрации',
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
              <div><img src={imgLogin} className="rounded-circle" alt="Войти" width="200" height="200" /></div>
              <Form noValidate className="w-50" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">Регистрация</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Label htmlFor="username">Ваш ник</Form.Label>
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
                  <Form.Label htmlFor="password">Пароль</Form.Label>
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
                  <Form.Label htmlFor="passwordConfirm">Подтвердите пароль</Form.Label>
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
                <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Зарегистрироваться</button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
