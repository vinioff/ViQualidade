// utils.js - Funções auxiliares
function formatarMoeda(valor) {
    return 'R$ ' + parseFloat(valor).toFixed(2).replace('.', ',');
}

function mostrarModal(titulo, mensagem, tipo = 'info') {
    // Implementação simples - você pode usar sua biblioteca de modal preferida
    alert(`${titulo}: ${mensagem}`);
}

function mostrarModalConfirmacao(titulo, mensagem, callbackConfirm) {
    if (confirm(`${titulo}\n${mensagem}`)) {
        callbackConfirm();
    }
}

function calcularTodosTotais() {
    // Implemente se necessário para seus cálculos
    console.log('Calculando totais...');
}