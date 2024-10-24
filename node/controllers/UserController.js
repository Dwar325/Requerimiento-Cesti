import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel.js';

export const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    console.log("Hashed password:", hashedPassword);
    await UserModel.create({ username, password: hashedPassword });

    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login exitoso', token });
  } catch (error) {
    console.log(`clave, ${process.env.JWT_SECRET}`)
    console.log(error)
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
