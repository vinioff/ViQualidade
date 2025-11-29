// adiciona_encomenda.js - Versão corrigida
document.addEventListener('DOMContentLoaded', function() {
    var botaoAdicionar = document.querySelector("#adicionar-encomenda");
    
    if (botaoAdicionar) {
        botaoAdicionar.addEventListener("click", function(event) {
            event.preventDefault();
            
            var form = document.querySelector("#form-adiciona");
            var encomenda = obtemEncomendaDoFormulario(form);

            var erros = validaEncomenda(encomenda);

            if (erros.length > 0) {
                // Usa modal personalizado para mostrar erros
                var mensagemErro = '<ul style="text-align: left; margin: 10px 0;">';
                erros.forEach(function(erro) {
                    mensagemErro += '<li>• ' + erro + '</li>';
                });
                mensagemErro += '</ul>';
                
                mostrarModal('Erro no Formulário', mensagemErro, 'error');
                return;
            }

            adicionaEncomendaNaTabela(encomenda);
            form.reset();
            
            // Feedback de sucesso
            mostrarModal('Sucesso!', 'Encomenda adicionada com sucesso!', 'success');
        });
    }
});

function obtemEncomendaDoFormulario(form) {
    var encomenda = {
        nome: form.nome.value,
        produto: form.produto.value,
        qtde: form.qtde.value,
        unitario: form.unitario.value,
        total: (form.qtde.value * form.unitario.value).toFixed(2)
    }

    return encomenda;
}

function validaEncomenda(encomenda) {
    var erros = [];

    if (!encomenda.nome) erros.push("Por favor, preencha o nome do cliente.");
    if (!encomenda.produto) erros.push("Por favor, selecione um produto.");
    
    if (!encomenda.qtde || encomenda.qtde <= 0) {
        erros.push("A quantidade deve ser maior que zero.");
    }
    
    if (!encomenda.unitario || encomenda.unitario <= 0) {
        erros.push("O valor unitário deve ser maior que zero.");
    }

    return erros;
}

function adicionaEncomendaNaTabela(encomenda) {
    var novaLinha = document.createElement("tr");
    novaLinha.classList.add("cliente");

    novaLinha.innerHTML = `
        <td class="nome">${encomenda.nome}</td>
        <td class="produto">${encomenda.produto}</td>
        <td class="qtde">${encomenda.qtde}</td>
        <td class="unitario">${formatarMoeda(encomenda.unitario)}</td>
        <td class="total">${formatarMoeda(encomenda.total)}</td>
        <td class="acoes">
            <button class="botao-remover btn btn-danger btn-sm">
                <i class="fa fa-trash"></i> Remover
            </button>
        </td>
    `;

    var tabela = document.querySelector("#tabela-clientes");
    tabela.appendChild(novaLinha);
}