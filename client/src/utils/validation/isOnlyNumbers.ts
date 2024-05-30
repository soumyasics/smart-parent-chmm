export const isOnlyNumbers = (data: string):boolean => {
    
    const numbersRegex = /^[0-9]+$/;
    return numbersRegex.test(data)
} 