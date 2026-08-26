import { userRepository } from '../repositories/user.repository.js';
import { hashPassword, comparePassword } from '../utils/crypto.util.js';

class UserService {
  async registerUser(userData) {
    // req.body ya viene validado y formateado por Zod
    const { first_name, last_name, email, password } = userData;

    // Solo se ejecutan verificaciones de lógica de negocio (BD)
    const userExists = await userRepository.getByEmail(email);
    if (userExists) {
      const error = new Error('Ya existe un usuario registrado con ese email');
      error.statusCode = 409;
      throw error;
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await userRepository.createUser({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role: 'user'
    });

    return {
    
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      role: newUser.role
    };
  }

  async loginUser(credentials) {
    const { email, password } = credentials;

    const user = await userRepository.getByEmail(email);
    if (!user) {
      const error = new Error('Credenciales inválidas');
      error.statusCode = 401;
      throw error;
    }

    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      const error = new Error('Credenciales inválidas');
      error.statusCode = 401;
      throw error;
    }

    return {
      id: user._id,
      first_name: user.first_name,
      email: user.email,
      role: user.role
    };
  }
}

export const userService = new UserService();