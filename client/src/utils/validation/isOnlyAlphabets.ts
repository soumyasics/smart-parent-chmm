export const isOnlyAlphabets = (data: string):boolean => {
    const alphabetRegex = /^[A-Za-z\s]*$/;
    return alphabetRegex.test(data)
} 