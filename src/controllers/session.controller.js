import { userService } from "../services/user.service.js";

export const register = async (req, res, next) => {
  try {
    const userPayload = await userService.registerUser(req.body);

    res.status(201).json({
      status: 'success',
      message: 'Usuario registrado correctamente',
      payload: userPayload
    });
  } catch (error) {
    // Pasa el error al middleware global de errores
    res.status(error.statusCode || 500).json({
      status: 'error',
      message: error.message || 'Error interno del servidor'
    });
  }
};



export const login = async (req, res, next) => {
  try {
    res.status(501).json({ status: 'info', message: 'Not implemented' });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.status(501).json({ status: 'info', message: 'Not implemented' });
  } catch (error) {
    next(error);
  }
};



