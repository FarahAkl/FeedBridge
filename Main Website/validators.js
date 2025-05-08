export const isEmail = (email) => {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
};

export const isValidCardholderName = (n) => {
  const regex = /^[A-Za-z\u0600-\u06FF\s]{2,}$/; // includes Arabic characters too
  return regex.test(n.trim());
};

export const isValidCardNumber = (n) => {
  const sanitized = n.replace(/\s+/g, ""); // remove spaces
  const onlyDigits = /^\d+$/;

  return (
    onlyDigits.test(sanitized) &&
    sanitized.length >= 13 &&
    sanitized.length <= 19
  );
};
// module.exports = {
//   isEmail,
//   isValidCardholderName,
//   isValidCardNumber,
// };