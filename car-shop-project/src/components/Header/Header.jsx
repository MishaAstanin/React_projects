import { Link } from "react-router-dom"
import { useState } from "react"

import './Header.css'

import logo from '/logo.png'

export default function Header() {
    return (
        <header>
            <nav>
                <div className='header-container'>
                    <Link to="/">
                        <img src={logo} className='logo' width="40" height="40" alt='logo' />
                    </Link>
                    <ul className='nav-list'>
                        <li><Link to="/">Главная</Link></li>
                        <li><Link to="/catalog">Каталог</Link></li>
                        <li><Link to="/profile">Профиль</Link></li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}