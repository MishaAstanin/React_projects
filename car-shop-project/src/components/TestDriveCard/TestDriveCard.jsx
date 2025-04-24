import { Link } from 'react-router-dom'

import './TestDriveCard.css'

export default function TestDriveCard({ id, date, car_id, handleClick }) {
    return (
        <div className="test-card-container">
            <div className="date">Дата: {date}</div>
            <div className="link-wrapper">
                <Link to={`/cars/${car_id}`}>Страница автомобиля</Link>
            </div>
            <div className="button-wrapper">
                <button onClick={() => handleClick(id)} className="delete-button">Удалить</button>
            </div>
        </div>
    )
}