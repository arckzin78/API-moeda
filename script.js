document.addEventListener("DOMContentLoaded", () => {
    const valorInput = document.querySelector(".valor");
    const moedaDe = document.querySelector(".converter");
    const moedaPara = document.querySelector(".para");
    const botaoTrocar = document.querySelector(".trocar");
    const resultadoDiv = document.querySelector(".result");

    const API_KEY = "c5f998d86a99276c512cb6a6"; //chave da API
    const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

    async function carregarMoedas() {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();

            if (data.result === "success") {
                const moedas = Object.keys(data.conversion_rates);
                moedas.forEach(moeda => {
                    const option1 = document.createElement("option");
                    const option2 = document.createElement("option");
                    option1.value = option2.value = moeda;
                    option1.textContent = option2.textContent = moeda;
                    moedaDe.appendChild(option1);
                    moedaPara.appendChild(option2);
                });

                moedaDe.value = "USD";
                moedaPara.value = "BRL";
            }
        } catch (error) {
            console.error("Erro ao carregar moedas:", error);
        }
    }

    async function converterMoeda() {
        const valor = parseFloat(valorInput.value);
        const de = moedaDe.value;
        const para = moedaPara.value;

        if (isNaN(valor) || valor <= 0) {
            resultadoDiv.innerHTML = "<p>Insira um valor válido.</p>";
            return;
        }

        try {
            const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${de}`);
            const data = await response.json();
            if (data.result === "success") {
                const taxa = data.conversion_rates[para];
                const resultado = (valor * taxa).toFixed(2);
                resultadoDiv.innerHTML = `<p>${valor} ${de} = ${resultado} ${para}</p>`;
            }
        } catch (error) {
            console.error("Erro na conversão:", error);
        }
    }

    botaoTrocar.addEventListener("click", converterMoeda);
    carregarMoedas();
});
