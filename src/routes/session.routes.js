import { Router } from "express";
import { usersModel } from "../models/users.model.js";
import { requireAuth,checkExistingUser } from "../middlewares/authMiddleware.js";
const sessionRoutes = Router();
// Ruta para registrar un nuevo usuario
sessionRoutes.post('/register', async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    try {
        // Crea un nuevo usuario en la base de datos
        const result = await usersModel.create({
            first_name, last_name, email, password
        });
        res.status(201).json({ message: 'User successfully added!!' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error });
    }
});

// Ruta para iniciar sesión
sessionRoutes.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Busca al usuario en la base de datos con las credenciales proporcionadas
        const user = await usersModel.findOne({ email, password });

        // Si no se encuentra el usuario, devuelve un mensaje de credenciales inválidas
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Asigna un rol al usuario según ciertas condiciones (en este caso, admin o usuario)
        if (user.email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
            user.role = 'admin';
        } else {
            user.role = 'usuario';
        }

        // Almacena el usuario en la sesión y redirige a la página principal
        req.session.user = user;
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
});

// Ruta para cerrar sesión
sessionRoutes.get('/logout', (req, res) => {
    // Destruye la sesión y redirige a la página de inicio de sesión
    req.session.destroy((error) => {
        if (error) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.redirect('/login');
    });
});

sessionRoutes.post('/logout', (req, res) => {
    // Destruir la sesión y redirigir al inicio de sesión
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.json({ redirect: '/login' });
    });
});

export default sessionRoutes;
