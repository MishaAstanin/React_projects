import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import axios from 'axios'

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

import { setUser } from '../../store/slices/userSlice'
import Form from '../LogRegForm/LogRegForm'
import { getErrorMessageReg } from '../../utils/errorMessages'

import './RegisterPage.css'

export default function RegisterPage() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [message, setMessage] = useState('')
    const [selectedRole, setSelectedRole] = useState('admin');

    const handleRegister = async (email, password) => {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password)
            .then(async ({ user }) => {
                const token = await user.getIdToken()
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken
                }))

                await axios.post('https://react-projects-ryoh.vercel.app/api/register', {
                    email: user.email,
                    uid: user.uid,
                    role: selectedRole,
                    token: token
                })

                navigate("/")
            })
            .catch(error => {
                setMessage(getErrorMessageReg(error.code))
                console.error('Код ошибки:', error.code || 'Нет кода')
                console.error('Сообщение:', error.message)
                console.error('Стек вызовов:', error.stack)
                throw error
            })
    }

    return (
        <div className='reg-page-conrainer'>
            <h1>Регистрация</h1>
            {message !== '' ? (
                <span className="error-message">{message}</span>
            ) : null}
            <div className='block-container'>
                <select name="roles"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}>
                    <option value="client">Клиент</option>
                    <option value="admin">Администратор</option>
                </select>
                <Form title="Зарегистрироваться" handleClick={handleRegister}/>
            </div>
            <span>Уже зарегистрированы? <Link to="/login">Войти</Link></span>
        </div>
    )
}
