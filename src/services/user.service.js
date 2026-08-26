import { userDAO } from '../dao/user.dao.js'

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

    // Verificación de duplicados a través del DAO
    const userExists = await userDAO.getByEmail(normalizedEmail);
    if (userExists) {
      const error = new Error('Ya existe un usuario registrado con ese email');
      error.statusCode = 409;
      throw error;
    }

    // Nota: En un entorno de producción, aquí deberías hasear la contraseña (ej. bcrypt) antes de guardar.

    const newUser = await userDAO.create({
      first_name,
      last_name,
      email: normalizedEmail,
      password,
      role: 'user'
    });

    return {
      
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      role: newUser.role
    };
  }
}

export const userService = new UserService();