window.onload = function () {
  exibirGraficoLiga();
  exibirGraficoTime()
  exibirLigaMaisAssistida()
};

function cadastrarQuiz() {
  let ligaVar = select_liga.value;
  let timeVar = select_time.value;
  
  if (ligaVar == "#" || ligaVar == "#") {
  
    alert("Por favor, válide todos os campos")
    return false;
  } else {
    fetch("/quiz/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ligaServer: ligaVar,
        timeServer: timeVar,
      }),
    })
    .then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!");

        if (resposta.ok) {
          console.log(resposta);

          resposta.json().then((json) => {
            console.log(json);
            console.log(JSON.stringify(json));

            setTimeout(function () {
              window.location = "./dashboard/dashboard2.0.html";
            }, 1000); // apenas para exibir o loading
          });
        } else {
          console.log("Houve um erro ao tentar realizar o login!");

          resposta.text().then((texto) => {
            console.error(texto);
          });
        }
      })
      .catch(function (erro) {
        console.log(erro);
      });
  }
}

// const ligaAssistida = ["Premier League"];

function exibirGraficoLiga() {
  
  exibirLigaMaisAssistida()

   
    fetch(`/quiz/exibirGraficoLiga`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados");
        }
        return response.json();
      })
      .then((data) => {
        const ctx = document.getElementById("ligaChart").getContext("2d");

        const labels = data.map((item) => item.liga);
        
        const dados = data.map((item) => item.quantidade);

        console.log(labels, dados);
        resultadoLiga.innerHTML = data[0].liga;
      

        new Chart(ctx, {
          type: "bar",
          data: {
            labels: labels, 
            datasets: [
              {
                label: "Quantidades escolhidas",
                data: dados,
                backgroundColor: "#f51414",
                borderColor: "#f51414",
                borderWidth: 1,
              },
            ],
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: "Ligas mais assistidas nos últimos dois anos",
                font: {
                  size: 20,
                },
                padding: {
                  top: 3,
                  bottom: 3,
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 1,
                  precision: 0,
                },
              },
            },
          },
        });
      })
      .catch((error) => {
        console.error("Erro no gráfico", error);
      });
}


function exibirGraficoTime() {
   
    fetch(`/quiz/exibirGraficoTime`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados");
        }
        return response.json();
      })
      .then((data) => {
        const ctx = document.getElementById("timeChart").getContext("2d");

        const labels = data.map((item) => item.timeSelecionado);
        const dados = data.map((item) => item.quantidade);

        console.log(labels, dados);
        resultadoTime.innerHTML = data[0].timeSelecionado

        new Chart(ctx, {
          type: "bar",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Quantidades escolhidas",
                color: "white",
                data: dados,
                backgroundColor: "#179928",
                borderColor: "#179928",
                borderWidth: 1,
              },
            ],
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: "Maiores torcidas",
                font: {
                  size: 20,
                },
                padding: {
                  top: 3,
                  bottom: 3,
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 1,
                  precision: 0,
                },
              },
            },
          },
        });
      })
      .catch((error) => {
        console.error("Erro no gráfico", error);
      });
}



function exibirLigaMaisAssistida() {
  fetch("/quiz/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then(function (resposta) {
      resposta.json().then((resposta) => {
        resposta.json.forEach((resposta) => {
          if (resposta.liga) {
            if (resposta.liga == 1) {
              resultadoLiga.innerHTML = 'Brasileirão'
            } else if (resposta.liga == 2) {
              resultadoLiga.innerHTML = 'Premier League'
            }else if (resposta.liga == 3) {
              resultadoLiga.innerHTML = 'La Liga'
            }else if (resposta.liga == 4) {
              resultadoLiga.innerHTML = 'Serie A'
            }else if (resposta.liga == 5) {
              resultadoLiga.innerHTML = 'Bundesliga'
            }else if (resposta.liga == 6) {
              resultadoLiga.innerHTML = 'Ligue 1'
            }else if (resposta.liga == 7) {
              resultadoLiga.innerHTML = 'MLS'
            }else {
              resultadoLiga.innerHTML = 'Outras'
            }
          }
        })
      })
    }

  )
  
}
