import { useState, useEffect } from 'react'
import axios from 'axios'

export const useFetchCarList = () => {
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCarList = async () => {
            try {
                const response = await axios.get('https://react-projects-ryoh.vercel.app/api/cars')
                setList(response.data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchCarList()
    }, [])

    return { list, loading, error }
};

export const useFetchCar = (carId) => {
    const [car, setCar] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const response = await axios.get(`https://react-projects-ryoh.vercel.app/api/cars/${carId}`)
                setCar(response.data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        if (carId) {
            fetchCar()
        }
    }, [carId])

    return { car, loading, error }
};

export const useFetchTestList = (uid) => {
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchTestList = async () => {
            try {
                const response = await axios.get(`https://react-projects-ryoh.vercel.app/api/profile/${uid}`)
                setList(response.data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        if (uid) {
            fetchTestList()
        }
    }, [uid])

    return { list, loading, error }
};

export const useFetchTestCount = (id) => {
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchTestCount = async () => {
            try {
                const response = await axios.get(`https://react-projects-ryoh.vercel.app/api/cars/tests/${id}`)
                setCount(response.data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        if (id) {
            fetchTestCount()
        }
    }, [id])

    return { count, loading, error }
};

export const useFetchTestUserCount = (uid, id) => {
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchTestUserCount = async () => {
            try {
                const response = await axios.get(`https://react-projects-ryoh.vercel.app/api/cars/tests/users/${uid}/${id}`)
                setCount(response.data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        if (uid && id) {
            fetchTestUserCount()
        }
    }, [uid, id])

    return { count, loading, error }
};
