export const validacaoValor = input => {
    const outroValor = input.value;

    if (outroValor == 0) {
        input.setCustomValidity("O valor deve ser maior que R$0,00");
        return;
      }
    input.setCustomValidity("");
}