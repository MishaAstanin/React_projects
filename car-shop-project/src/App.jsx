import { Route, Routes } from 'react-router-dom'

import Header from './components/Header/Header'
import CarList from './components/CarList/CarList'
import CarInfo from './components/CarInfo/CarInfo'
import MainPage from './components/MainPage/MainPage'
import LoginPage from './components/LoginPage/LoginPage'
import RegisterPage from './components/RegisterPage/RegisterPage'
import Profile from './components/Profile/Profile'
import TestDriveForm from './components/TestDriveForm/TestDriveForm'

import './App.css'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/catalog" element={<CarList />} />
          <Route path="/cars/:id" element={<CarInfo />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/test-drive/:carId" element={<TestDriveForm />} />
        </Routes>
      </main>
    </>  
  )
}