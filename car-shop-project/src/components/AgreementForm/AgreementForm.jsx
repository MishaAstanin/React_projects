import { useDispatch, useSelector } from "react-redux"

import {accept, reject } from '../../store/slices/agreeFormSlice'

import './AgreementForm.css'

export default function AgreementForm() {

    const dispatch = useDispatch()
    const isAccepted = useSelector(state => state.agree.isAccepted)

    const handleCheckboxChange = (event) => {
        dispatch(event.target.checked ? accept() : reject())
    }

    return (
        <div className="agree-form-container">
            <h2>Принятие условий оформления тест-драйва</h2>
            <div className="check-container">
                <label htmlFor="agree">С правилами ознакомлен</label>
                <input type="checkbox" id="agree" name="agree" checked={isAccepted} onChange={handleCheckboxChange} />
            </div>
            <button type="submit" disabled={!isAccepted}>Записаться</button>
        </div>
    )
}