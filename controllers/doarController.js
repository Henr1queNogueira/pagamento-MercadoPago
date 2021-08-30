const mercadopago = require('mercadopago');
const moment = require('moment');
const Doar = require('../models/Doar');
const adminAuth = require('../config/adminAuth');

module.exports = app => {
    //CONFIG DO MERCADO PAGO
    mercadopago.configure({
        sandbox: true,
        access_token: "TEST-1206163947530915-080923-77406ec6192e5f9663e02ec259e5ed7f-241642261"
    });

    app.get('/doar', (req, res) => {
         res.status(200).render('doar');        
    });
    
    app.post('/doar', async(req, res) => {
        var erros = [];

        var id = "" + Date.now();
        const nomeDoador = req.body.nome;
        const cpf = req.body.cpf;
        const cnpj = req.body.cnpj;
        const endereco = req.body.endereco;
        const email = req.body.email;
        const contato = req.body.contato; 

        let valores = req.body.valor.replace(',', '.');
        let outroValor=req.body.outroValor.replace(',', '.');

        if(valores==0){//quando o outro valor for selecionado
            valores=outroValor;
            //valores=trim(valores);
        }
        valores = parseFloat(valores);
        
        if(!nomeDoador || typeof nomeDoador == undefined || nomeDoador == null){
            erros.push({msg: 'Preecha o campo de nome'});
        }

        if(!endereco || typeof endereco == undefined || endereco == null){
            erros.push({msg: 'Preencha o campo de endereço'});
        }

        if(!email || typeof email == undefined || email == null){
            erros.push({msg: 'E-mail inválido'});
        }

        if(!contato || typeof contato == undefined || contato == null){
            erros.push({msg: 'Preencha o campo de contato'});
        }


        if(valores === "" || typeof valores == undefined || valores == null || valores == 0){
            erros.push({msg: 'Selecione um valor'});
        }

        /* Fim de validação dos campos do formulario */

        if(erros.length > 0){
            res.render('doar', {erros, nomeDoador, endereco, email, contato, valores});
        }

        let dataDoacao = new Date();

        let dados = {
            items : [
                item = {
                    id: id,
                    title: 'Doação para Casa de Apoio - Filhos de Hiram',
                    quantity: 1,
                    currency_id: 'BRL',
                    unit_price: valores
                }
            ],
            payer: {
                name: nomeDoador,
                email: email,
            }, 
            //como vai aparecer na fatura do cartão
            statement_descriptor: "DOACAO-CASA-FH",
            back_urls: {
                "success": "http://localhost:8000/",
            },
            auto_return: "approved",
    
            external_reference : id
        };
        try {
            var payment = await mercadopago.preferences.create(dados);
            console.log(payment);
            
                Doar.create({
                     identificador: id,
                     doador: nomeDoador,
                     cpf: cpf,
                     cnpj: cnpj,
                     endereco: endereco,
                     contato: contato,
                     email: email,
                     valorDoacao: valores,
                     dataDoacao: dataDoacao
                });
            return res.redirect(payment.body.init_point);
            
        } catch (error) {
            return res.send(error.message);
            
        }

    });

    //PAG- PAINEL ADM
    app.get("/adm/", adminAuth, (req, res) =>{
        res.render('adm/painelAdm');
    });

    //LISTANDO AS DOAÇÕES RECEBIDAS
    app.get("/adm/listDoacoes/:num", adminAuth, (req, res) => {
        let listDoacoes = req.params.num;
        var offset = 0;

            if(isNaN(listDoacoes)|| listDoacoes == 1){
                offset = 0;
            } else{
                offset = (parseInt(listDoacoes)-1) * 4;
            }

        Doar.findAndCountAll({
            limit: 4,
            offset: offset,
            order:[
                ['id', 'DESC']
            ]
        }).then(doacoes => {
            var next;

            if(offset + 4 >= doacoes.count){
                next = false;
            } else {
                next = true;
            }
            var result = {
                listDoacoes: parseInt(listDoacoes),
                next: next,
                doacoes: doacoes
            }
            Doar.findAll().then(() => {
                res.render("adm/listDoacoes", {result: result});
            });
            
        });
    });

};