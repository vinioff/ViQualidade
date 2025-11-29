// modal.js - Sistema completo de modais personalizados
let modalAtivo = null;

// Função para mostrar modal simples
function mostrarModal(titulo, mensagem, tipo = 'info') {
    // Fecha modal anterior se existir
    if (modalAtivo) {
        document.body.removeChild(modalAtivo);
    }

    // Cria o modal
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
                    <p>${mensagem}</p>
                </div>
                <div class="modal-footer">
                    <button class="modal-btn-ok">OK</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    modalAtivo = modal;

    // Adiciona eventos
    const closeBtn = modal.querySelector('.modal-close');
    const okBtn = modal.querySelector('.modal-btn-ok');
    const overlay = modal.querySelector('.modal-overlay');

    function fecharModal() {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            if (modal.parentNode) {
                document.body.removeChild(modal);
            }
            modalAtivo = null;
        }, 300);
    }

    closeBtn.onclick = fecharModal;
    okBtn.onclick = fecharModal;
    overlay.onclick = function(e) {
        if (e.target === overlay) {
            fecharModal();
        }
    };

    // Fecha com ESC
    function fecharComESC(e) {
        if (e.key === 'Escape') {
            fecharModal();
            document.removeEventListener('keydown', fecharComESC);
        }
    }
    document.addEventListener('keydown', fecharComESC);
}

// Função para mostrar modal de confirmação
function mostrarModalConfirmacao(titulo, mensagem, callbackConfirm) {
    // Fecha modal anterior se existir
    if (modalAtivo) {
        document.body.removeChild(modalAtivo);
    }

    // Cria o modal de confirmação
    const modal = document.createElement('div');
    modal.id = 'custom-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content warning">
                <div class="modal-header">
                    <h3>${titulo}</h3>
                    <span class="modal-close">&times;</span>
                </div>
                <div class="modal-body">
                    <p>${mensagem}</p>
                </div>
                <div class="modal-footer">
                    <button class="modal-btn-cancelar">Cancelar</button>
                    <button class="modal-btn-confirmar">Confirmar</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    modalAtivo = modal;

    // Adiciona eventos
    const closeBtn = modal.querySelector('.modal-close');
    const cancelBtn = modal.querySelector('.modal-btn-cancelar');
    const confirmBtn = modal.querySelector('.modal-btn-confirmar');
    const overlay = modal.querySelector('.modal-overlay');

    function fecharModal() {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            if (modal.parentNode) {
                document.body.removeChild(modal);
            }
            modalAtivo = null;
        }, 300);
    }

    function confirmar() {
        fecharModal();
        callbackConfirm();
    }

    closeBtn.onclick = fecharModal;
    cancelBtn.onclick = fecharModal;
    confirmBtn.onclick = confirmar;
    
    overlay.onclick = function(e) {
        if (e.target === overlay) {
            fecharModal();
        }
    };

    // Fecha com ESC
    function fecharComESC(e) {
        if (e.key === 'Escape') {
            fecharModal();
            document.removeEventListener('keydown', fecharComESC);
        }
    }
    document.addEventListener('keydown', fecharComESC);
}

// Função para formatar moeda
function formatarMoeda(valor) {
    if (!valor) return 'R$ 0,00';
    return 'R$ ' + parseFloat(valor).toFixed(2).replace('.', ',');
}

// Função para calcular totais (se necessário)
function calcularTodosTotais() {
    const linhas = document.querySelectorAll('#tabela-clientes .cliente');
    linhas.forEach(linha => {
        const qtde = parseFloat(linha.querySelector('.qtde').textContent) || 0;
        const unitario = parseFloat(linha.querySelector('.unitario').textContent.replace('R$ ', '').replace(',', '.')) || 0;
        const total = qtde * unitario;
        linha.querySelector('.total').textContent = formatarMoeda(total);
    });
}