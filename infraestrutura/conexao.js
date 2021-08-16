const Sequelize = require('sequelize');

const conexao = new Sequelize('payment-mercado-pago', 'root', 'henri201', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    define: {
        timestamps: false
    }
    
});

module.exports = conexao;