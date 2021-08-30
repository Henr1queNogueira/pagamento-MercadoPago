const customExpress = require('./config/customExpress');
const conexao = require('./infraestrutura/conexao');


conexao.authenticate().then(() => {
    console.log('--Banco Conectado--');
    const app = customExpress();
    app.listen(8000, (req, res) => { console.log('Servidor rodando na porta: 8000')});

   
    
}).catch((erro) => {
    console.log('--DEU RUIM--', erro)
});


/**git push origin main */