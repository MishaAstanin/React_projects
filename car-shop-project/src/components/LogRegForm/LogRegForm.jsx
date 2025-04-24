import { useState } from 'react'

import './LogRegForm.css'

export default function LogRegForm({ title, handleClick, role}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className='log-reg-form-container'>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" required></input>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" required></input>
            <button onClick={() => handleClick(email, password, role)}>{title}</button>
        </div>
    )
}