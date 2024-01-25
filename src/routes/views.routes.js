import { Router } from "express";
import { requireAuth, checkExistingUser } from "../middlewares/authMiddleware.js";

const viewsRoutes = Router();

// Ruta principal que requiere autenticación antes de mostrar la vista de bienvenida
viewsRoutes.get('/', requireAuth, (req, res) => {
    const user = req.session.user;
    res.render('welcome', { user });
});

// Ruta para mostrar la vista de inicio de sesión
viewsRoutes.get('/login', checkExistingUser, (req, res) => {
    res.render('login');
});

// Ruta para mostrar la vista de registro
viewsRoutes.get('/register', checkExistingUser, (req, res) => {
    res.render('register');
});

export default viewsRoutes;
