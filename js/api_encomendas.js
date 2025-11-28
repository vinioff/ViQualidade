// api_encomendas.js - Versão JSON Server
var botaoAPI = document.querySelector("#api-encomenda");

if (botaoAPI) {
    botaoAPI.addEventListener("click", function(){
        // Mostra loading no botão
        var textoOriginal = this.innerHTML;
        this.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Carregando...';
        this.disabled = true;

        // Consome a API do JSON Server
        fetch('http://localhost:3000/encomendas')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na rede');
                }
                return response.json();
            })
            .then(encomendas => {
                // Adiciona cada encomenda na tabela
                encomendas.forEach(encomenda => {
                    adicionaEncomendaTabela(encomenda);
                });
                
                // Mostra modal de sucesso
                mostrarModal('Sucesso!', `${encomendas.length} encomendas carregadas do servidor!`, 'success');
            })
            .catch(error => {
                console.error('Erro ao carregar encomendas:', error);
                mostrarModal('Erro!', 'Não foi possível conectar ao servidor. Verifique se o JSON Server está rodando.', 'error');
            })
            .finally(() => {
                // Restaura o botão
                this.innerHTML = textoOriginal;
                this.disabled = false;
            });
    });
}

// Função para adicionar encomenda vinda da API
function adicionaEncomendaTabela(dadosEncomenda) {
    var tabela = document.querySelector("#tabela-clientes");
    
    // Verifica se a encomenda já existe (pelo ID ou nome+produto)
    var encomendaExistente = Array.from(tabela.querySelectorAll('.cliente')).find(linha => {
        var nome = linha.querySelector('.nome').textContent;
        var produto = linha.querySelector('.produto').textContent;
        return nome === dadosEncomenda.nome && produto === dadosEncomenda.produto;
    });

    if (!encomendaExistente) {
        var novaLinha = document.createElement('tr');
        novaLinha.className = 'cliente';
        novaLinha.setAttribute('data-id', dadosEncomenda.id || '');

        novaLinha.innerHTML = `
            <td class="nome">${dadosEncomenda.nome}</td>
            <td class="produto">${dadosEncomenda.produto}</td>
            <td class="qtde">${dadosEncomenda.qtde}</td>
            <td class="unitario">${formatarMoeda(dadosEncomenda.unitario)}</td>
            <td class="total">${formatarMoeda(dadosEncomenda.total)}</td>
        `;

        tabela.appendChild(novaLinha);
        
        // Recalcula totais se necessário
        calcularTodosTotais();
    }
}