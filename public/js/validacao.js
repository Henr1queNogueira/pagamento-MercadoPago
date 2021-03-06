import { validacaoCPF } from "./validacaoCPF.js";
import { validacaoValor} from "./validacaoValor.js";

const retornarMensagemDeErro = (tipo, validity) => {
    let mensagemDeErro = "";

    const tiposDeErro = [
        "valueMissing", 
        "typeMismatch",
        "tooShort",
        "rangeUnderflow",
        "customError",
        "patternMismatch",
    ];

    const mensagensDeErro = {
        nome: {
            valueMissing: "Este campo é obrigatório"
        },
        cpf: {
            customError: "Este não é um CPF Válido"
        },
        cnpj: {
            customError: "Este não é um CNPJ Válido"
        },
        email: {
            valueMissing: "Este campo é obrigatório",
            typeMismatch: "Este e-mail não é válido"
        },
        contato: {
            valueMissing: "Este campo é obrigatório"

        },
        endereco: {
            valueMissing: "Este campo é obrigatório"
        },
        outroValor: {
            customError: "O valor deve ser maior que R$0,00"
        },
        dataNascimento: {
            valueMissing: "Este campo é obrigatório",
            customError: 'Você deve ser maior que 18 anos para se cadastrar.'
        },
        senha: {
            valueMissing: "Este campo é obrigatório"
        },
        confirmarSenha: {
            valueMissing: "Este campo é obrigatório"
            
        }
      
    };
    tiposDeErro.forEach(erro => {
        if(validity[erro]){
            mensagemDeErro = mensagensDeErro[tipo][erro];
        }
    });
    return mensagemDeErro;
}

export const validarInput = (input, adicionarErro = true) => {
    
    const classeElementoErro = "erro-validacao";
    const classeInputErro = "possui-erro-validacao";
    const elementoPai = input.parentNode;
    const elementoErroExiste = elementoPai.querySelector(
        `.${classeElementoErro}`
    );
    const elementoErro = elementoErroExiste || document.createElement('div');
    const elementoEhValido = input.validity.valid;

    const tipo = input.dataset.tipo;
    const validadoresEspecificos = {
       cpf: input => validacaoCPF(input),
       outroValor: input => validacaoValor(input),
       dataNascimento:input => validaDataNascimento(input)
   };

   if(validadoresEspecificos[tipo]){
       validadoresEspecificos[tipo](input);
   }
   if(!elementoEhValido){
       elementoErro.className = classeElementoErro;
       elementoErro.textContent = retornarMensagemDeErro(tipo, input.validity);

       if(adicionarErro){
        input.after(elementoErro);
        input.classList.add(classeInputErro);
       }
   } else {
        elementoErro.remove();
        input.classList.remove(classeInputErro);

   }

   // Inicio- Validando data de Nascimento
    function validaDataNascimento(input) {
        const dataRecebida = new Date(input.value)
        let mensagem = ''

        if(!maiorQue18(dataRecebida)) {
            mensagem = 'Você deve ser maior que 18 anos para se cadastrar.'
        }

        input.setCustomValidity(mensagem);
    }

    function maiorQue18(data) {
        const dataAtual = new Date();
        const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());

        return dataMais18 <= dataAtual
    }
    // Fim- Validando data de Nascimento



}