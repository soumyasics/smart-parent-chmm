export const validatePincode = (pincode: string): boolean => {
    const pincodeRegex = /^\d{6}$/;
    return pincodeRegex.test(pincode)
}