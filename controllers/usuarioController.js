const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');

module.exports = app => {
    //Pag- LISTAGEM DE USUÁRIOS
    app.get('/adm/usuarios', (req, res) => {
        Usuario.findAll().then(usuarios => {
            res.status(200).render('adm/usuarios/usuarios', {usuarios:usuarios});
        });
    });
    
    //PAG- CRIAR USUÁRIO
    app.get('/adm/usuarios/criar', (req, res) => {
        res.status(200).render("adm/usuarios/criar");

    });

    //SALVAR NO BANCO DE DADOS
    app.post('/usuarios/criar', (req, res) => {
        //var erros = [];

        var nome = req.body.nomeUsuario;
        var email = req.body.emailUsuario;
        var dataNascimento = req.body.dataNascimentoUsuario;
        var senha = req.body.senhaUsuario;
        var senha2 = req.body.senha2Usuario;

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

        //res.json({nome, email, dataNascimento, senha, senha2});

    /*Início da Validação do campos
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
    /* Fim de validação dos campos do formulario 

        if(erros.length > 0){
            res.render('admin/usuarios/new', {erros, nome, email, dataNascimento, senha, senha2});
        } */

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