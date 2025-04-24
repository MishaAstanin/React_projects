import { Navigate } from 'react-router-dom'

import { useAuth } from '../../hooks/use-auth.js'
import { useFetchCarList } from '../../hooks/use-fetch-data.js'
import CarCard from '../CarCard/CarCard'

import './CarList.css'

export default function CarList() {
    const { isAuth } = useAuth()
    if (!isAuth) return <Navigate to="/login" />

    const { list, loading, error } = useFetchCarList()
    if (loading) return <div>Загрузка...</div>
    if (error) return <div>Ошибка: {error}</div>
    if (list.length === 0) return <div>Каталог пуст</div>

    return (
        <section className='catalog-container'>
            {list.map(car => (
                <CarCard key={car.id} {...car} />
            ))}
        </section>
    );
}