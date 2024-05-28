const { validateEmailForLogin } = require("./validation/emailValidateForLogin");
const {
  validateEmailForRegistration,
} = require("./validation/emailValidationForReg");
const { validatePassword } = require("./validation/passwordValidation");
const { validateMongooseId } = require("./validation/mongooseIdValidation");

module.exports = {
  validateEmailForLogin,
  validateEmailForRegistration,
  validatePassword,
  validateMongooseId,
};
