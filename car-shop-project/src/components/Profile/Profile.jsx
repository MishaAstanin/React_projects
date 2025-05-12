import { Navigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import axios from 'axios'

import { useAuth } from '../../hooks/use-auth'
import { removeUser } from '../../store/slices/userSlice'

import TestDriveCard from '../TestDriveCard/TestDriveCard'

import './Profile.css'

export default function Profile() {
    const { isAuth, email, id } = useAuth()
    const dispatch = useDispatch()

    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const getTestList = async () => {
            try {
                if (!isAuth) return
                const response = await axios.get(`https://react-projects-ryoh.vercel.app/api/profile/${id}`)
                setList(response.data)
            } catch (error) {
                setError(error.response?.data || error.message)
            } finally {
                setLoading(false)
            }
        }

        getTestList()
    }, [id])

    const handleDelete = async (testDriveId) => {
        try {
            await axios.delete(`https://react-projects-ryoh.vercel.app/api/test-drives/${testDriveId}`)
            setList(prevList => prevList.filter(item => item.id !== testDriveId))
            alert('Тест-драйв удален')
        } catch (error) {
            setError(error.response?.data || error.message)
        }
    }

    if (!isAuth) return <Navigate to="/login" />
    if (loading) return <div>Загрузка...</div>
    if (error) return <div>Ошибка: {error}</div>

    return (
        <>
            <div className='profile-container'>
                <h1>Профиль пользователя {email}</h1>
                <button onClick={() => dispatch(removeUser())}>Выйти</button>
            </div>
            <h2>Оформленные тест-драйвы:</h2>
            <section>
                {list.map(test => (
                    <TestDriveCard key={test.id} id={test.id} date={test.date} car_id={test.car_id} handleClick={handleDelete} />
                ))}
            </section>
        </>
    )
}
