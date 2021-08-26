const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const adminAuth = require('../config/adminAuth');

module.exports = app => {
    //Pag- LISTAGEM DE USUÁRIOS
    app.get('/adm/usuarios',adminAuth, (req, res) => {

        Usuario.findAll().then(usuarios => {
            res.status(200).render('adm/usuarios/usuarios', {usuarios:usuarios});
        });
    });
    
    //PAG- CRIAR USUÁRIO
    app.get('/adm/usuarios/criar', adminAuth, (req, res) => {
        res.status(200).render("adm/usuarios/criar");

    });

    //SALVAR NO BANCO DE DADOS
    app.post('/usuarios/criar', (req, res) => {
        var erros = [];

        var nome = req.body.nomeUsuario;
        var email = req.body.emailUsuario;
        var dataNascimento = req.body.dataNascimentoUsuario;
        var senha = req.body.senhaUsuario;
        var senha2 = req.body.senha2Usuario;
         /*Início da Validação do campos*/
        if(!nome || typeof nome == undefined || nome == null){
            erros.push({msg: 'Nome inválido'});
        }
        if(!email || typeof email == undefined || email == null){
            erros.push({msg: 'E-mail inválido'});
        }
        if(!dataNascimento || typeof dataNascimento == undefined || dataNascimento == null){
            erros.push({msg: 'Data de Nascimento inválida'});
        }

        if(!senha || typeof senha == undefined || senha == null){
            erros.push({msg: 'Senha inválida'});
        }

        if(senha != senha2){
            erros.push({msg: 'As senhas são diferentes'})
        }
        /* Fim de validação dos campos do formulario */

        if(erros.length > 0){
            res.render('adm/usuarios/criar', {erros, nome, email, dataNascimento, senha, senha2});
        }

        Usuario.findOne({ where: {email: email}}).then(usuario => {
                if(usuario == undefined){

                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(senha, salt);

                Usuario.create({
                    nome: nome,
                    email: email,
                    dataNascimento: dataNascimento,
                    senha: hash
                }).then(() => {
                    res.redirect('/adm/usuarios')
                }).catch(() => {
                    res.redirect('/adm/usuarios/criar')
                });
            }
        });

    });

    //EDITAR USUÁRIO
    app.get('/adm/usuarios/editar/:id',adminAuth, (req, res) => {
        var id = req.params.id;
        //var moment=require('moment');
        //verificar se o id é um numero
        if(isNaN(id)){
            res.redirect('/adm/usuarios');
        }
        Usuario.findByPk(id).then(usuario => {
            if(usuario != undefined){
                res.render('adm/usuarios/editar', {usuario: usuario});
            }else {
                res.redirect('/adm/usuarios');
            }
        }).catch(erro => {
            res.send(erro);
            //res.redirect('/admin/usuarios');
        });

    });

    /* Rota para salvar a edição*/
    app.post('/adm/usuarios/atualizar', (req, res) => {
        var id = req.body.id;
        var nome = req.body.nomeUsuario;
        var email = req.body.emailUsuario;
        var dataNascimento = req.body.dataNascimentoUsuario;

        Usuario.update({nome: nome, email: email, dataNascimento: dataNascimento}, {
            where: {
                id: Number(id)
                
            }
        }).then(() => {
            res.redirect('/adm/usuarios');
        }).catch(err => {
            res.send('deu ruim: '+err)
        });
        
    });  

    /*Rota para deletar usuários */
    app.post('/usuarios/delete', (req, res) => {
        var id = req.body.id;
        //verficando se o id é válido, diferente de nulo
        //verficar se o valor é número ou não. 
        if(id != undefined || !isNaN(id)){
            Usuario.destroy({
                where: {
                    id:id
                }
            }).then(() =>{
                res.redirect('/adm/usuarios');
            });

        }else{
            res.redirect('/adm/usuarios');
        }
    });
       

   
};