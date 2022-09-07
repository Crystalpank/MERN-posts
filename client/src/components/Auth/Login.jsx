import React from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../API/AuthService';
import { useState, useContext } from 'react';
import { AuthContext } from '../../App';
import { Row, Col, TextInput, Button } from 'react-materialize'

const Login = () => {
    const [form, setForm] = useState({
        identifier: '',
        password: ''
    })

    const { login } = useContext(AuthContext);
    const loginHandler = async (e) => {
        e.preventDefault()
        try {
            if (!(form.identifier && form.password)) {
                return
            }
            const response = await AuthService.login(form)
            login(response.token, response.user.id, response.user.username)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
    return (
        <div className="container">
            <div className="auth-page">
                <h3 className="teal-text">Авторизация</h3>
                <form className="form form-login" onSubmit={loginHandler}>
                    <Col
                        s={12}>
                        <TextInput
                            className="auth-input"
                            label="Логин"
                            validate
                            onChange={(e) => setForm({ ...form, identifier: e.target.value })} />
                    </Col>
                    <Col
                        s={12}>
                        <TextInput
                            type="password"
                            label="Пароль"
                            validate
                            onChange={(e) => setForm({ ...form, password: e.target.value })} />
                    </Col>
                    <Row>
                        <Button
                            className="green"
                            type="submit"
                            waves="light">
                            Войти
                        </Button>
                        <Link to="/registration" className="btn-outline btn-reg teal-text">Нет аккаунта?</Link>
                    </Row>
                </form>
            </div>
        </div >
    );
}

export default Login;
