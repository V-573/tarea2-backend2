/**
 * Valida si un string tiene un formato de email válido.
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida la longitud mínima de una contraseña.
 */
export const isValidPasswordLength = (password, minLength = 6) => {
  return typeof password === 'string' && password.length >= minLength;
};