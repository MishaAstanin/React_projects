import { Navigate, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { format } from 'date-fns';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import AgreementForm from "../AgreementForm/AgreementForm"

import { useAuth } from '../../hooks/use-auth.js'

import './TestDriveForm.css'

export default function TestDriveForm() {
    const { isAuth, id } = useAuth()
    if (!isAuth) return <Navigate to="/login" />

    const navigate = useNavigate()

    const { carId } = useParams()

    const [date, setDate] = useState(new Date())

    const handleSubmit = async (event) => {
        event.preventDefault()

        const testDrive = {
            uid: id,
            carid: carId,
            firstName: event.target.firstName.value.trim(),
            lastName: event.target.lastName.value.trim(),
            phone: event.target.phone.value.trim(),
            email: event.target.email.value.trim(),
            date: format(date, 'dd.MM.yyyy')
        }

        try {
            const response = await axios.post(
                'http://localhost:3001/api/new-test-drive',
                testDrive,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    validateStatus: (status) => status >= 200 && status < 400
                }
            );

            alert('Тест-драйв успешно оформлен')
            navigate('/profile')

        } catch (error) {
            const errorMessage = error.response?.data?.message ||
                error.response?.statusText ||
                'Произошла ошибка при отправке формы'
            alert(errorMessage)
        }
    }

    return (
        <div className="form-container">
            <form id="registrationForm" onSubmit={handleSubmit}>
                <h2 className="form-title">Оформление тест-драйва</h2>

                <div className="input-group">
                    <label htmlFor="firstName">Имя:</label>
                    <input type="text"
                        id="firstName"
                        name="firstName"
                        required
                        placeholder="Введите ваше имя" />
                </div>

                <div className="input-group">
                    <label htmlFor="lastName">Фамилия:</label>
                    <input type="text"
                        id="lastName"
                        name="lastName"
                        required
                        placeholder="Введите вашу фамилию" />
                </div>

                <div className="input-group">
                    <label htmlFor="phone">Телефон:</label>
                    <input type="tel"
                        id="phone"
                        name="phone"
                        required
                        placeholder="+7 (___) ___-__-__" />
                </div>

                <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="Введите почту" />
                </div>

                <div className="input-group">
                    <label htmlFor="date">Дата тест-драйва:</label>
                    <DatePicker
                        selected={date}
                        onChange={(newDate) => setDate(newDate)}
                        minDate={new Date()}
                        dateFormat="dd.MM.yyyy"
                        placeholderText="Выберите дату"
                        disabledKeyboardNavigation={true}
                        onKeyDown={(e) => e.preventDefault()}
                    />
                </div>

                <AgreementForm />
            </form>
        </div>
    )
}