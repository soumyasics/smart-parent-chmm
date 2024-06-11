export const togglePasswordVisibility = (passwordType: string) => {
    return passwordType === 'password' ? 'text' : 'password';
}