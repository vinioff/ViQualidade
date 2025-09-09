// document.querySelector(".total").textContent=document.querySelector(".qnt").textContent * document.querySelector(".unitario").textContent
// document.querySelectorAll(".cliente").textContent

// Capturar as encomendas da tabela
var clientes = document.querySelectorAll(".cliente");

// Passa por todas as encomenda e calcula o valor total

for (var count = 0; count < clientes.length; count++) {
    // clientes[count].querySelector(".total").textContent = clientes[count].querySelector(".qnt").textContent * clientes[count].querySelector(".unitario").textContent
    // clientes[count].querySelector(".cliente")

    //   Quantidade de encomenda 

    var tab_qtde = clientes[count].querySelector(".qnt").textContent;

    // Valor de unitário 
    var tab_unitario = clientes[count].querySelector(".unitario").textContent;

    // Calcula e exibe o total


    // Verifica se a quantidade é válida
    if (tab_qtde < 1 || isNaN(tab_qtde)) {
        // A quantidadeé menor que 1 ou não é númerica
        clientes[count].querySelector(".qnt").textContent = "Quantidade Invalída!";
        clientes[count].classList.add("info-invalida");
    } else {
        clientes[count].querySelector(".total").textContent = calculoTotal
            (tab_qtde, tab_unitario);

        // Envia formatação para o valor unitário
        clientes[count].querySelector(".unitario").textContent = formatarValor(tab_unitario,)
    }

    // Verifica se o valor de unitario é válido
    if (tab_unitario > 17 || isNaN(tab_unitario)) {
        clientes[count].querySelector(".unitario").textContent = "Quantidade Invalída!";
        clientes[count].classList.add("info-valor");


    } else {
        clientes[count].querySelector(".total").textContent = calculoTotal
            (tab_qtde, tab_unitario);

        // Envia formatação para o valor unitário
        clientes[count].querySelector(".unitario").textContent = formatarValor(tab_unitario,)
    }

}

// 
function calculoTotal(qtde, unit) {
    var total = 0;
    total = qtde * unit;
    return formatarValor(total);
}

// Função que formata valor em R$
function formatarValor(valor) {
    var valor_formatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    return valor_formatado;
};





