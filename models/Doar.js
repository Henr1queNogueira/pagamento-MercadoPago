const Sequelize = require('sequelize');
const conexao = require('../infraestrutura/conexao');
const moment = require('moment');

//Criando tabelas
const Doar = conexao.define('Doacoes', {
    identificador: {
        type: Sequelize.STRING
    },
    doador:{
        type: Sequelize.STRING,
        allowNull: false,
        notNull: true     
    },
    cpf:{
        type: Sequelize.STRING
    },
    cnpj:{
        type: Sequelize.STRING
    },
    endereco:{
        type: Sequelize.STRING
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
        notNull: true
    },
    contato:{
        type: Sequelize.STRING
    },
    valorDoacao:{
        type: Sequelize.FLOAT,
        allowNull: false,
        notNull: true
    },
    dataDoacao: {
        type: Sequelize.DATE,
        get: function() {return moment().format('YYYY-MM-DD HH:MM:SS');},
    }
      
}
); 
module.exports = Doar;

/*Doar.sync({force: false}).then(() => {
    console.log("tabela de doação criada")
});*/
