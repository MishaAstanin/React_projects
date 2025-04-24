import { useParams } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { useAuth } from '../../hooks/use-auth.js'
import { useFetchCar, useFetchTestCount, useFetchTestUserCount } from '../../hooks/use-fetch-data.js'

import './CarInfo.css'

export default function CarInfo() {
    const { isAuth, id: uid } = useAuth()
    if (!isAuth) return <Navigate to="/login" />

    const { id } = useParams()
    const { car, loading, error } = useFetchCar(id)
    const { count } = useFetchTestCount(id)
    const {count: userCount} = useFetchTestUserCount(uid, id)

    if (loading) return <div>Загрузка...</div>
    if (error) return <div>Ошибка: {error}</div>
    if (!car) return <div>Автомобиль не найден</div>

    const imageUrl = `/${car.id}.jpg`

    return (
        <div className='car-info-container'>
            <img src={imageUrl} alt={car.brand + car.model} />
            <div className='car-info'>
                <h2>{car.brand}</h2>
                <h3>Модель: {car.model}</h3>
                <p><b>Цена:</b> <span>{car.price} руб</span></p>
                <p><b>Цвет:</b> <span>{car.color}</span></p>
                <p><b>Объем двигателя:</b> <span>{car.engine} л</span></p>
                <p><b>Лошадиные силы:</b> <span>{car.horsepower}</span></p>
                <p><b>Макс. скорость:</b> <span>{car.speed} км/ч</span></p>
                <p><b>Год выпуска:</b> <span>{car.year} г</span></p>
            </div>

            {userCount != 0 && (
                <span className='span-green'>У Вас уже оформлен тест-драйв на данный автомобиль</span>
            )}
            { count < 5 && userCount == 0 && (
                <Link to={`/test-drive/${car.id}`} className="button">Записаться на тест-драйв</Link>
            )}
            { count >= 5 && (
                <span className='span-yellow'>На данный момент все машины заняты. Можете связаться с нами по номеру: +7-988-123-45-45</span>
            )}
        </div>
    )
}