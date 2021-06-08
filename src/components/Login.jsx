import React from 'react';
import imgLogin from '../../assets/images/login.png';
// import { useFormik } from 'formik';

const Login = () => (
  <div className="container-fluid flex-grow-1">
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-xl-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
            <div><img src={imgLogin} className="rounded-circle" alt="Войти" width="200" height="200" /></div>
            <form className="w-50">
              <h1 className="text-center mb-4">Войти</h1>
              <div className="form-floating mb-3 form-group">
                <input name="username" autoComplete="username" required="" placeholder="Ваш ник" id="username" className="form-control" value="" />
                <label htmlFor="username">Ваш ник</label>
              </div>
              <div className="form-floating mb-4 form-group">
                <input name="password" autoComplete="current-password" required="" placeholder="Пароль" type="password" id="password" className="form-control" value="" />
                <label htmlFor="password">Пароль</label>
              </div>
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

export default Login;
