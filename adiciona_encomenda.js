var botaoAdicionar = document.querySelector("#adcionar-encomenda");

botaoAdicionar.addEventListener("click", function(event){
    event.preventDefault();

    //Captura o formulário
    var form = document.querySelector("#form-adcionar");

    //Captura a nova encomenda
    var NovaEncomenda = obtemEncomenda(form);

    var tabela = document.querySelector("#tabela-clientes")

    // Insere a nova encomenda na tabela
    tabela.appendChild(montaTR(""));

    //Limpa
    form.reset();

});

//Captura os dados do formulário
function obtemEncomenda(formulário){
    var encomenda ={
        nome : formulário.nome.value,
        produto : formulário.nome.value,
        qtde : formulário.nome.value,
        unitario : formulário.nome.value
        
    }
    return encomenda;
}

// Função pra criar nova linha 
function montaTR(NovaEncomenda){
    var linha = document.createElement("tr");

    linha.appendChild(montaTD(NovaEncomenda.nome));
    linha.appendChild(montaTD(NovaEncomenda.produto));
    linha.appendChild(montaTD(NovaEncomenda.qtde));
    linha.appendChild(montaTD(NovaEncomenda.unitario));
    linha.appendChild(montaTD(calculoTotal(NovaEncomenda.qtde,NovaEncomenda.unitario)));
    
    return linha;
}

// Função para criar nova coluna
function montaTD(dadocoluna){
    var coluna = document.createElement("td");
    coluna.textContent = dadocoluna;
    return coluna;
}