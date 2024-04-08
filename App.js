import express from 'express';
import cors from "cors";
import UsersRoutes from './ConnectNEU/Users/routes.js';
import mongoose from "mongoose";
import session from "express-session"
import SessionRoutes from './SessionRoutes.js';
mongoose.connect("mongodb+srv://maggiecolletteneu:8vAdRiKHRbsb4uoM@webdevfinal.0fraa4z.mongodb.net/connectNEU?retryWrites=true&w=majority&appName=WebDevFinal");
//mongodb+srv://maggiecolletteneu:8vAdRiKHRbsb4uoM@webdevfinal.0fraa4z.mongodb.net/?retryWrites=true&w=majority&appName=WebDevFinal
const app = express()
app.use(cors());
app.use(express.json()); //adds the body parses it
app.use(
    session({
        secret: "my secret", //usually placed in env variable
        resave: false,
        saveUninitialized: false,
    })
); //parses cookies from the header
UsersRoutes(app);
SessionRoutes
app.listen(4000);