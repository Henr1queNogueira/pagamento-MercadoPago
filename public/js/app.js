 import { validarInput } from "./validacao.js";

window.onload = () => {
  const inputs = document.querySelectorAll("input");

    inputs.forEach(input => {
      input.addEventListener("input", () => {
        validarInput(input, false);
      });
      input.addEventListener('blur', () => {
        validarInput(input);
      });
    });
}