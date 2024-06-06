function cadastrar() {

    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    let nomeVar = nome_input.value;
    let emailVar = email_input.value;
    let senhaVar = senha_input.value;
  
    let numeros = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let numeroNaSenha = false;

    for (let n = 0; n < numeros.length; n++) {
      if (senhaVar.includes(numeros[n])) {
        numeroNaSenha = true;
      }
  }
  


    if (nomeVar == ""){
      cardErro.style.display = "block";
      mensagem_erro.innerHTML ="Preencha o seu nome!";
    } else if (emailVar == "") {
      cardErro.style.display = "block";
      mensagem_erro.innerHTML ="Informe um email, por favor!";
    } else if (senhaVar == '' || numeroNaSenha == false ) {
      cardErro.style.display = "block";
      mensagem_erro.innerHTML ="A senha deve conter um número";
    } else {
  
      
      fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // crie um atributo que recebe o valor recuperado aqui
          // Agora vá para o arquivo routes/usuario.js
          nomeServer: nomeVar,
          emailServer: emailVar,
          senhaServer: senhaVar,
        }),
      })
        .then(function (resposta) {
          console.log("resposta: ", resposta);
  
          if (resposta.ok) {
            cardErro.style.display = "block";
  
            mensagem_erro.innerHTML =
              "<b>Cadastro realizado com sucesso! Redirecionando para tela de Login...</b>";
  
            setTimeout(() => {
              window.location = "login.html";
            }, "2000");
  
            limparFormulario();
          } else {
            throw "Houve um erro ao tentar realizar o cadastro!";
          }
        })
        .catch(function (resposta) {
          console.log(`#ERRO: ${resposta}`);
        });
  
        function sumirMensagem() {
          cardErro.style.display = "none";
        }
        }
      return false;
    }
  

    // Enviando o valor da nova input