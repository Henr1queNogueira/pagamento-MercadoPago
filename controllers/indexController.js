const Usuario = require('../models/Usuario.js');
const bcrypt = require('bcryptjs');

    module.exports = app => {
        //Pag Principal
        app.get('/', (req, res) => {
            res.status(200).render('index');
        }); 

        //TELA DE LOGIN
        app.get('/login', (req, res) => {
            res.status(200).render('login');
        });

        app.post('/autenticar', (req, res) => {
            var email = req.body.email;
            var senha = req.body.senha;
            
            Usuario.findOne({where: {email: email}}).then(usuario => {
                if(usuario != undefined){ //se o email existir, valida senha
                    var correct = bcrypt.compareSync(senha, usuario.senha);

                    var msgErro = "Dados incorretos";

                    if(correct){
                        req.session.usuario = {
                            id: usuario.id,
                            email: usuario.email
                        }
                        res.redirect('/adm/');
                    }else{
                        res.render('/login', {msgErro: msgErro});
                    }

                } else {
                    res.redirect('/login', {msgErro: msgErro});
                }
            });
        });

        //PARA FAZER LOGOUT
        app.get('/logout', (req, res) => {
            req.session.usuario = undefined;
            res.redirect('/');

        });

    };
