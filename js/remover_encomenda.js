// remover_encomenda.js - Versão final
document.addEventListener('DOMContentLoaded', function() {
    var tabela = document.querySelector("#tabela-clientes");
    
    if (tabela) {
        // Adicionar evento de clique nos botões de remover
        tabela.addEventListener("click", function(event) {
            if (event.target.classList.contains('botao-remover') || 
                event.target.closest('.botao-remover')) {
                
                var botao = event.target.classList.contains('botao-remover') 
                    ? event.target 
                    : event.target.closest('.botao-remover');
                var linha = botao.closest('.cliente');
                
                if (linha) {
                    var id = linha.getAttribute('data-id');
                    var nome = linha.querySelector('.nome').textContent;
                    var produto = linha.querySelector('.produto').textContent;
                    
                    mostrarModalConfirmacao(
                        'Remover Encomenda',
                        `Deseja remover a encomenda de ${nome} - ${produto}?`,
                        function() {
                            if (id) {
                                // Remove do JSON Server
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
                                // Remove apenas localmente
                                linha.style.opacity = '0';
                                setTimeout(() => {
                                    linha.remove();
                                    mostrarModal('Sucesso!', 'Encomenda removida!', 'success');
                                }, 300);
                            }
                        }
                    );
                }
            }
        });
    }
});