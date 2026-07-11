// TODO: Define express-validator rules for auth endpoints
// - registerValidation: name, email, password
// - loginValidation: email, password

const registerValidation = [
  // TODO: Validate name (required, string)
  // TODO: Validate email (required, valid email)
  // TODO: Validate password (required, min length 6)
];

const loginValidation = [
  // TODO: Validate email (required, valid email)
  // TODO: Validate password (required)
];

module.exports = { registerValidation, loginValidation };
