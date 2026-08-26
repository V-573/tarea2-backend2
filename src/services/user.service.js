
import { userRepository } from '../repositories/user.repository.js';
import { hashPassword, comparePassword } from '../utils/crypto.util.js';
import { isValidEmail, isValidPasswordLength } from '../utils/validators.util.js';

class UserService {

  async registerUser(userData) {

    const { first_name, last_name, email, password } = userData;

    // Lógica de negocio: Validar campos mínimos
    if (!first_name || !last_name || !email || !password) {
      const error = new Error('Todos los campos son obligatorios');
      error.statusCode = 400;
      throw error;
    }

    const normalizedEmail = email.toLowerCase().trim();

// 2. Validación de formato de email
    if (!isValidEmail(normalizedEmail)) {
      const error = new Error('El formato del correo electrónico no es válido');
      error.statusCode = 400;
      throw error;
    }

    // 3. Validación de longitud de contraseña (mínimo 6 caracteres)
    if (!isValidPasswordLength(password, 6)) {
      const error = new Error('La contraseña debe tener al menos 6 caracteres');
      error.statusCode = 400;
      throw error;
    }

    

    // Verificación de duplicados a través del DAO
    const userExists = await userRepository.getByEmail(normalizedEmail);
    if (userExists) {
      const error = new Error('Ya existe un usuario registrado con ese email');
      error.statusCode = 409;
      throw error;
    }

    //hash a la  contraseña para no guardarla directamente en la BD

    const hashedPassword = await hashPassword(password);

    const newUser = await userRepository.createUser({
      first_name,
      last_name,
      email: normalizedEmail,
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

    if (!email || !password) {
      const error = new Error('Email y contraseña son obligatorios');
      error.statusCode = 400;
      throw error;
    }

    const normalizedEmail = email.toLowerCase().trim();

    // 2. Validación de formato de email
    if (!isValidEmail(normalizedEmail)) {
      const error = new Error('El formato del correo electrónico no es válido');
      error.statusCode = 400;
      throw error;
    }


    const user = await userRepository.getByEmail(normalizedEmail);
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