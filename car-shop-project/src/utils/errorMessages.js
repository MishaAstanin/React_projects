export const getErrorMessageLog = (errorCode) => {
    switch (errorCode) {
        case 'auth/invalid-credential':
            return 'Учетные данные неверны или недействительны'
        case 'auth/invalid-email':
            return 'Пожалуйста, введите корректный адрес электронной почты'
        case 'auth/missing-password':
            return 'Не был предоставлен пароль'
        case 'auth/too-many-requests':
            return 'Слишком много попыток входа. Попробуйте позже'
        default:
            return 'Произошла ошибка при входе'
    }
}

export const getErrorMessageReg = (errorCode) => {
    switch (errorCode) {
        case 'auth/email-already-in-use':
            return 'Электронная почта уже используется'
        case 'auth/invalid-email':
            return 'Пожалуйста, введите корректный адрес электронной почты'
        case 'auth/missing-password':
            return 'Не был предоставлен пароль'
        case 'auth/weak-password':
            return 'Пароль слишком простой'
        case 'auth/too-many-requests':
            return 'Слишком много попыток входа. Попробуйте позже'
        default:
            return 'Произошла ошибка при входе'
    }
}