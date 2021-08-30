/*FUNÇÃO que serve para confirmar ou não a removação de usuario. */
function confirmDelete(event, form){
    //impede que o formulário seja submetido
    event.preventDefault();
    var decision = confirm('Você tem certeza que quer excluir?');
  
    if(decision == true){
        form.submit();
    }
  
};

//Função da Página de Doar
function teste(param){
    //param 0 = radio padrão | param 1 = rádio + checkbox
    if(param==0){
      //limpar campo outro valor quando o valor5 for selecionado
      if(document.getElementById("valor5").checked==false){
        document.getElementById("outroValor").value="";
        
      }
    }
    if(param==1){
      //desabilitar o valor 
      document.getElementById("outroValor").disabled=false;
      document.getElementById("valor5").checked=true;
    }
    
  }