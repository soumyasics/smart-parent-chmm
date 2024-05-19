export const validatePassword = (password: string): boolean => {
    let minLength = 8;
    let maxLength = 100;
    return password.length >= minLength && password.length <= maxLength;
}