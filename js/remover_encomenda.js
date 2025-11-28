// remover_encomenda.js - Versão atualizada com botão
document.addEventListener('DOMContentLoaded', function() {
    var tabela = document.querySelector("#tabela-clientes");
    
    if (tabela) {
        // Adicionar evento de clique nos botões de remover
        tabela.addEventListener("click", function(event) {
            if (event.target.classList.contains('botao-remover')) {
                var linha = event.target.closest('.cliente');
                
                if (linha) {
                    var id = linha.getAttribute('data-id');
                    var nome = linha.querySelector('.nome').textContent;
                    var produto = linha.querySelector('.produto').textContent;
                    
                    mostrarModalConfirmacao(
                        'Remover Encomenda',
                        `Deseja remover a encomenda de <strong>${nome}</strong> - ${produto}?`,
                        function() {
                            // Remove do JSON Server se tiver ID
                            if (id) {
                                fetch(`http://localhost:3000/encomendas/${id}`, {
                                    method: 'DELETE'
                                })
                                .then(response => {
                                    if (!response.ok) throw new Error('Erro ao remover');
                                    
                                    // Animação de remoção
                                    linha.style.opacity = '0';
                                    linha.style.transition = 'opacity 0.3s ease';
                                    
                                    setTimeout(function() {
                                        linha.remove();
                                        mostrarModal('Sucesso!', 'Encomenda removida do servidor!', 'success');
                                    }, 300);
                                })
                                .catch(error => {
                                    console.error('Erro ao remover:', error);
                                    mostrarModal('Erro!', 'Não foi possível remover do servidor.', 'error');
                                });
                            } else {
                                // Remove apenas localmente se não tiver ID
                                linha.style.opacity = '0';
                                setTimeout(() => linha.remove(), 300);
                                mostrarModal('Sucesso!', 'Encomenda removida!', 'success');
                            }
                        }
                    );
                }
            }
        });
    }
});