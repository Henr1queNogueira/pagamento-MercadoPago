export const validacaoValor = input => {
  const outroValor = input.value.replace(/(\d+).(\d+)/, "");
  if(document.getElementById("valor5".checked) && outroValor == 0) {
      input.setCustomValidity("O valor deve ser maior que R$0,00");
      return;
    }
  input.setCustomValidity("");
}