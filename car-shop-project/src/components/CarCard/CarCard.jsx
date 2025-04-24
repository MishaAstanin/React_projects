import { Link } from 'react-router-dom'

import './CarCard.css'

export default function Card({ id, brand, model, price }) {
    const imageUrl = `/${id}.jpg`;
    return (
        <div className='card-container'>
            <img src={imageUrl} alt={brand} />
            <div className='card-info'>
                <h2>{brand}</h2>
                <h3>{model}</h3>
                <p>Цена: {price}</p>
                <Link to={`/cars/${id}`} className="button">Подробнее</Link>
            </div>
        </div>
    )
}