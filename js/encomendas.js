console.log('Script carregado!');

// Espera o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM completamente carregado');
    
    // Calcula totais iniciais
    calcularTodosTotais();
    
    // Adiciona evento ao botão
    document.getElementById('adicionar-encomenda').onclick = function(e) {
        e.preventDefault();
        console.log('Botão clicado - adicionando encomenda');
        adicionarEncomendaSimples();
    };
    
    // Adiciona validação em tempo real nos inputs
    const qtdeInput = document.querySelector('input[name="qtde"]');
    const unitarioInput = document.querySelector('input[name="unitario"]');
    
    qtdeInput.addEventListener('input', function() {
        if (this.value < 0) this.value = 1;
    });
    
    unitarioInput.addEventListener('input', function() {
        if (this.value < 0) this.value = 0.01;
    });
});

function adicionarEncomendaSimples() {
    // Pega valores dos inputs
    const nome = document.querySelector('input[name="nome"]').value.trim();
    const produto = document.getElementById('produto').value;
    const qtde = parseFloat(document.querySelector('input[name="qtde"]').value);
    const unitario = parseFloat(document.querySelector('input[name="unitario"]').value);
    
    console.log('Valores:', {nome, produto, qtde, unitario});
    
    // Validação completa
    if (!nome) {
        mostrarModal('Atenção!', 'Por favor, preencha o nome do cliente.', 'warning');
        document.querySelector('input[name="nome"]').focus();
        return;
    }
    
    if (!produto) {
        mostrarModal('Atenção!', 'Por favor, selecione um produto.', 'warning');
        document.getElementById('produto').focus();
        return;
    }
    
    if (isNaN(qtde) || qtde < 1) {
        mostrarModal('Valor Inválido!', 'A quantidade deve ser um número maior que 0.', 'error');
        document.querySelector('input[name="qtde"]').focus();
        return;
    }
    
    if (isNaN(unitario) || unitario <= 0) {
        mostrarModal('Valor Inválido!', 'O valor unitário deve ser maior que R$ 0,00.', 'error');
        document.querySelector('input[name="unitario"]').focus();
        return;
    }
    
    // Adiciona à tabela
    const tbody = document.getElementById('tabela-clientes');
    const novaLinha = tbody.insertRow();
    
    novaLinha.className = 'cliente';
    novaLinha.innerHTML = `
        <td class="nome">${nome}</td>
        <td class="produto">${produto}</td>
        <td class="qtde">${qtde}</td>
        <td class="unitario">${formatarMoeda(unitario)}</td>
        <td class="total">${formatarMoeda(qtde * unitario)}</td>
    `;
    
    // Limpa formulário
    document.getElementById('form-adiciona').reset();
    
    // Recalcula totais
    calcularTodosTotais();
    
    // Mostra modal de sucesso
    mostrarModal('Sucesso!', `Encomenda de <strong>${nome}</strong> adicionada com sucesso!`, 'success');
}

function calcularTodosTotais() {
    document.querySelectorAll('.cliente').forEach(linha => {
        const qtdeElement = linha.querySelector('.qtde');
        const unitarioElement = linha.querySelector('.unitario');
        const totalElement = linha.querySelector('.total');
        
        // Usa parseMoeda para converter os valores formatados de volta para número
        const qtde = parseFloat(qtdeElement.textContent) || 0;
        const unitario = parseMoeda(unitarioElement.textContent);
        const total = qtde * unitario;
        
        // Remove classes de erro
        linha.classList.remove('info-invalida');
        qtdeElement.style.color = '';
        unitarioElement.style.color = '';
        
        if (qtde > 0 && unitario > 0) {
            // Formata os valores corretamente
            unitarioElement.textContent = formatarMoeda(unitario);
            totalElement.textContent = formatarMoeda(total);
        } else {
            totalElement.textContent = 'Inválido';
            linha.classList.add('info-invalida');
            
            if (qtde <= 0 || isNaN(qtde)) {
                qtdeElement.textContent = qtdeElement.textContent === 'w' ? 'w' : qtde;
                qtdeElement.style.color = 'red';
            }
            
            if (unitario <= 0 || isNaN(unitario)) {
                unitarioElement.textContent = unitarioElement.textContent === 'w' ? 'w' : unitario;
                unitarioElement.style.color = 'red';
            }
        }
    });
}

// Função para formatar valores em Real Brasileiro
function formatarMoeda(valor) {
    const numero = typeof valor === 'string' ? parseFloat(valor.replace(/[^\d,]/g, '').replace(',', '.')) : valor;
    
    if (isNaN(numero)) return 'R$ 0,00';
    
    // Verifica se é número inteiro
    if (Number.isInteger(numero)) {
        return 'R$ ' + numero.toLocaleString('pt-BR', { minimumFractionDigits: 0 });
    } else {
        return 'R$ ' + numero.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
}

// Função para converter texto formatado em número
function parseMoeda(texto) {
    if (!texto || texto === 'w') return 0;
    
    // Remove formatação e converte para número
    const textoLimpo = texto.toString()
        .replace('R$', '')
        .replace(/\./g, '')
        .replace(',', '.')
        .trim();
    
    return parseFloat(textoLimpo) || 0;
}

// Sistema de Modal Moderno
function mostrarModal(titulo, mensagem, tipo = 'info') {
    // Remove modal existente
    const modalExistente = document.getElementById('custom-modal');
    if (modalExistente) {
        modalExistente.remove();
    }
    
    // Cria novo modal
    const modal = document.createElement('div');
    modal.id = 'custom-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content ${tipo}">
                <div class="modal-header">
                    <h3>${titulo}</h3>
                    <span class="modal-close">&times;</span>
                </div>
                <div class="modal-body">
                    ${mensagem}
                </div>
                <div class="modal-footer">
                    <button class="modal-btn-ok">OK</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Adiciona eventos
    const overlay = modal.querySelector('.modal-overlay');
    const closeBtn = modal.querySelector('.modal-close');
    const okBtn = modal.querySelector('.modal-btn-ok');
    
    function fecharModal() {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => modal.remove(), 300);
    }
    
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) fecharModal();
    });
    
    closeBtn.addEventListener('click', fecharModal);
    okBtn.addEventListener('click', fecharModal);
    
    // Tecla ESC
    document.addEventListener('keydown', function fecharComESC(e) {
        if (e.key === 'Escape') {
            fecharModal();
            document.removeEventListener('keydown', fecharComESC);
        }
    });
}

