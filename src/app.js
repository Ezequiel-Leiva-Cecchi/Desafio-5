// app.js
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import handlebars from 'express-handlebars';
import MongoStore from 'connect-mongo';
import sessionRoutes from './routes/session.routes.js';
import viewsRoutes from './routes/views.routes.js';
import { requireAuth, checkExistingUser } from './middlewares/authMiddleware.js';

const PORT = 8080;
const app = express();

// Configuración de la sesión y conexión a MongoDB
app.use(session({
    secret: `C0d3r3Z3`,
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://ezequielleivacecchi:85ixLqC5qRqh93VJ@productscoder.9liypih.mongodb.net/CoderEcommerce",
    })
}));

mongoose.connect('mongodb+srv://ezequielleivacecchi:85ixLqC5qRqh93VJ@productscoder.9liypih.mongodb.net/CoderEcommerce');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// Configuración de Handlebars
const hbs = handlebars.create({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    }
});
app.engine('handlebars', hbs.engine);
app.set('views', 'src/views');
app.set('view engine', 'handlebars');

// Rutas de sesión
app.use('/api/session', sessionRoutes);

// Rutas de vistas
app.use('/', viewsRoutes);

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});
