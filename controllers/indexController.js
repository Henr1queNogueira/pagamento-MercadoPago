const Usuario = require('../models/Usuario.js');
const bcrypt = require('bcryptjs');

    module.exports = app => {
        //Pag Principal
        app.get('/', (req, res) => {
            res.status(200).render('index');
        }); 

        //TELA DE LOGIN
        app.get('/login', (req, res) => {
            var msgError = req.flash("msgError");
            msgError = (msgError == undefined || msgError.length == 0) ? undefined : msgError;

            var senhaError = req.flash("senhaError");
            senhaError = (senhaError == undefined || senhaError.length == 0) ? undefined: senhaError;

            res.status(200).render('login', {msgError, senhaError});
        });

        app.post('/autenticar', (req, res) => {
            var email = req.body.email;
            var senha = req.body.senha;

            var msgError = "Usuário não encontrado";
            var senhaError = "Senha incorreta";


            Usuario.findOne({where: {email: email}}).then(usuario => {
                if(usuario != undefined){ //se o email existir, valida senha
                    var correct = bcrypt.compareSync(senha, usuario.senha);

                    if(correct){
                        req.session.usuario = {
                            id: usuario.id,
                            email: usuario.email
                        }
                        res.redirect('/adm/');
                    }else{
                        req.flash("senhaError", senhaError);
                        res.redirect('/login');
                    }

                } else {
                    req.flash("msgError", msgError);
                    res.redirect('/login');
                }
            });
        });

        //PARA FAZER LOGOUT
        app.get('/logout', (req, res) => {
            req.session.usuario = undefined;
            res.redirect('/');

        });

    };
