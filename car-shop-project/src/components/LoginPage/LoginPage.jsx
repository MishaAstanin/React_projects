import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

import { setUser } from '../../store/slices/userSlice'
import Form from '../LogRegForm/LogRegForm'
import { getErrorMessageLog } from '../../utils/errorMessages'

import './LoginPage.css'

export default function LoginPage() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [message, setMessage] = useState('')

    const handleLogin = (email, password) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken
                }))
                navigate("/")
            })
            .catch(error => {
                setMessage(getErrorMessageLog(error.code))
                console.error('Код ошибки:', error.code || 'Нет кода')
                console.error('Сообщение:', error.message)
                console.error('Стек вызовов:', error.stack)
                throw error
            })
    }

    return (
        <div className='login-page-container'>
            <h1>Вход в аккаунт</h1>
            {message !== '' ? (
                <span className="error-message">{message}</span>
            ) : null}
            <div>
                <Form title="Войти" handleClick={handleLogin}></Form>
            </div>
            <span>Нет аккаунта? <Link to="/register">Зарегистрироваться</Link></span>
        </div>
    )
}