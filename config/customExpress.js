const express = require('express');
const consign = require('consign');
const session = require('express-session');
const flash = require('express-flash');
const path = require('path');

module.exports = () => {
    const app = express();

    //Sessões com Express
    app.use(session({
        secret: "mamacitafalavagabundosenta",
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 600000}

    }));

    app.use(flash());

    //Responsável por enviar dados json ou formulario para back-end
    app.use(express.json());
    app.use(express.urlencoded({ extended: true}));

    //EJS com express
    app.set('view engine', 'ejs');

    //Arquivos estáticos c/ express
    app.use(express.static('public'));

    consign()
        .include('controllers')
        .into(app);

    return app;

}
