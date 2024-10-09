import bcrypt from 'bcrypt';

/**
 * Codifica uma senha.
 * @param {string} password - Senha original.
 * @returns {string} Senha codificada.
 */
const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

/**
 * Verifica se a senha informada está correta.
 * @param {string} plainPassword - Senha original.
 * @param {string} hashedPassword - Senha codificada.
 * @returns {boolean} Retorno booleano para verificação.
 */
const checkPassword = async (plainPassword: string, hashedPassword: string) => {
  try {
    return bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    return false;
  }
};

export { hashPassword, checkPassword };
