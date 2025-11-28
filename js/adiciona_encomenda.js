// adiciona_encomenda.js - Versão JSON Server
var botaoAdicionar = document.querySelector("#adicionar-encomenda");

botaoAdicionar.addEventListener("click", function(event){
    event.preventDefault();
    
    var form = document.querySelector("#form-adiciona");
    var novaEncomenda = obtemEncomenda(form);

    // Validação
    var erros = validaEncomenda(novaEncomenda);
    if (erros.length > 0) {
        exibeMensagensErro(erros);
        return;
    }

    // Calcula o total
    novaEncomenda.total = novaEncomenda.qtde * novaEncomenda.unitario;
    novaEncomenda.data = new Date().toISOString().split('T')[0]; // Data atual

    // Mostra loading no botão
    var textoOriginal = this.innerHTML;
    this.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Salvando...';
    this.disabled = true;

    // Salva no JSON Server
    fetch('http://localhost:3000/encomendas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaEncomenda)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao salvar');
        }
        return response.json();
    })
    .then(encomendaSalva => {
        // Adiciona com ID retornado pelo servidor
        adicionaEncomendaTabela(encomendaSalva);
        form.reset();
        
        // Limpa mensagens de erro
        var mensagensErro = document.querySelector("#mensagens-erro");
        if (mensagensErro) mensagensErro.innerHTML = "";

        mostrarModal('Sucesso!', `Encomenda de <strong>${encomendaSalva.nome}</strong> salva no servidor!`, 'success');
    })
    .catch(error => {
        console.error('Erro ao salvar encomenda:', error);
        mostrarModal('Erro!', 'Não foi possível salvar no servidor.', 'error');
    })
    .finally(() => {
        // Restaura o botão
        this.innerHTML = textoOriginal;
        this.disabled = false;
    });
});

// Funções auxiliares (mantenha as que já existem)
function obtemEncomenda(formulario) {
    return {
        nome: formulario.nome.value,
        produto: formulario.produto.value,
        qtde: parseFloat(formulario.qtde.value),
        unitario: parseFloat(formulario.unitario.value)
    };
}

function validaEncomenda(encomenda) {
    var erros = [];
    if (!encomenda.nome) erros.push("O nome não pode ser vazio");
    if (!encomenda.produto) erros.push("Selecione um produto");
    if (!encomenda.qtde || encomenda.qtde <= 0) erros.push("Quantidade inválida");
    if (!encomenda.unitario || encomenda.unitario <= 0) erros.push("Valor unitário inválido");
    return erros;
}

function exibeMensagensErro(erros) {
    var ul = document.querySelector("#mensagens-erro");
    if (!ul) {
        ul = document.createElement('ul');
        ul.id = 'mensagens-erro';
        ul.className = 'mensagens-erro';
        var form = document.querySelector("#form-adiciona");
        form.parentNode.insertBefore(ul, form);
    }
    
    ul.innerHTML = "";
    erros.forEach(function(erro) {
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
}