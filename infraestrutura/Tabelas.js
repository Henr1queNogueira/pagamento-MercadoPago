/*class Tabelas {
    int(conexao){
       this.conexao = conexao;

       this.criarDoador();

    }
    criarDoador() {
        const sql = `CREATE TABLE IF NOT EXISTS Doacoes (id int(11) NOT NULL AUTO_INCREMENT,
        identificador varchar(100), 
        doador varchar(150) NOT NULL, 
        cpf varchar(20) NOT NULL, 
        email varchar(150) NOT NULL,
        valorDoacao float(20) NOT NULL, 
        dataDoacao datetime,
        PRIMARY KEY (id))`

            this.conexao.query(sql, (erro) => {
                if(erro){
                    console.log(erro);
                } else {
                    console.log('TABELA CRIADA');

                }
            });
    }

}
module.exports = new Tabelas;*/