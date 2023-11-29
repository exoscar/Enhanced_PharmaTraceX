function isStrongPassword(password) {
  // Define your criteria for a strong password
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasDigits = /\d/.test(password);
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  // Check if the password meets all criteria
  const isStrong =
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasDigits &&
    hasSpecialChars;

  return isStrong;
}

module.exports = {
  isStrongPassword,
};
