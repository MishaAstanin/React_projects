import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAccepted: false
}

const agreeFormSlice = createSlice({
    name: 'agree',
    initialState,
    reducers: {
        accept(state) {
            state.isAccepted = true
        },
        reject(state) {
            state.isAccepted = false
        }
    },
})

// Автоматически генерирует специальные функции, называемые action creators.
export const { accept, reject } = agreeFormSlice.actions

// Функция редьюсера, которая автоматически генерируется Redux Toolkit при создании слайса.
export default agreeFormSlice.reducer