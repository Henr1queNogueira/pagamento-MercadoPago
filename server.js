const customExpress = require('./config/customExpress');
//const conexao = require('./infraestrutura/conexao');
const app = customExpress();


/*conexao.authenticate().then(() => {
    console.log('--Banco Conectado--');
    const app = customExpress();

   
    
}).catch((erro) => {
    console.log('--DEU RUIM--', erro)
});*/

app.listen(8000, (req, res) => { console.log('Servidor rodando na porta: 8000')});
/**git push origin main */