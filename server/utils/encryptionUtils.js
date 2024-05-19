const bcrypt = require("bcrypt");
export const encryptPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

export const comparePasswords = async (
  realHashedPassword,
  userInputPassword
) => {
  const isPasswordMatch = await bcrypt.compare(
    realHashedPassword,
    userInputPassword
  );
  return isPasswordMatch;
};
