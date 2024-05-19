export const validatePhoneNumber = (phoneNumber: string): boolean => {
  const phoneNumberRegex = /^\d{10}$/;

  return phoneNumberRegex.test(phoneNumber);
};
