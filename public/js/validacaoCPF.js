const ehUmCPFComNumerosRepetidos = cpf => {
    const cpfsInvalidos = [
        "11111111111",
        "22222222222",
        "33333333333",
        "44444444444",
        "55555555555",
        "66666666666",
        "77777777777",
        "88888888888",
        "99999999999"
      ];
      if(cpfsInvalidos.includes(cpf)) {
          return true
      }

     return false;
};

const calcularValorTotal = multiplicador => (resultado, numeroAtual) => 
resultado + numeroAtual * multiplicador--;

const calcularDigito = (parteCPF, multiplicador) => {
    //total = multiplicação dos números
    let digitoGerado = 0;
    let valorTotal = 0;

    valorTotal = parteCPF.reduce(calcularValorTotal(multiplicador), 0);
    digitoGerado = 11 - (valorTotal % 11)
    
    if(digitoGerado > 9){
        digitoGerado = 0;
    }
    return digitoGerado;
}

export const validacaoCPF = input => {
    const cpfNumeros = input.value.replace(/\D/g, "");

    if (ehUmCPFComNumerosRepetidos(cpfNumeros)) {
        input.setCustomValidity("Este não é um CPF válido");
        return;
      }
      const primeiraParte = cpfNumeros.substr(0,9).split("");
      const primeiroDigitoDoCPF = Number(cpfNumeros.charAt(9));
      const primeiroDigitoGerado = calcularDigito(primeiraParte, 10);

      if(primeiroDigitoDoCPF !== primeiroDigitoGerado){
          input.setCustomValidity("Este não é um CPF Válido");
          return;
      }

      const segundaParte = cpfNumeros.substr(0,10).split("");
      const segundoDigitoDoCPF = Number(cpfNumeros.charAt(10));
      const segundoDigitoGerado = calcularDigito(segundaParte, 11);
      
      if(segundoDigitoDoCPF !== segundoDigitoGerado){
          input.setCustomValidity("Este não é um CPF válido");
          return;
      }
    
      input.setCustomValidity("");

};