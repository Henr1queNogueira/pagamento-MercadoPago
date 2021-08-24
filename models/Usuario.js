const Sequelize = require("sequelize");
const conexao = require("../infraestrutura/conexao");
const moment = require('moment');

const Usuario = conexao.define('usuarios', {
    nome:{
        type: Sequelize.STRING,
        allowNull: false,
        notNull: true
        
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
        notNull: true
    },
    dataNascimento:{
        type: Sequelize.DATE,
        get: function() {return moment.utc(this.getDataValue('dataNascimento')).format('YYYY-MM-DD')},
        allowNull: false
        },
    senha:{
        type: Sequelize.STRING,
        allowNull: false,
        notNull: true
    }

});

module.exports = Usuario;

/*Usuario.sync({force: false}).then(() => {
    console.log("Tabela criada!")
});*/
