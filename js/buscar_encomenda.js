// buscar_encomenda.js - Versão corrigida
document.addEventListener('DOMContentLoaded', function() {
    var campoFiltro = document.querySelector("#filtrar-tabela");

    if (campoFiltro) {
        campoFiltro.addEventListener("input", function() {
            var clientes = document.querySelectorAll(".cliente");
            var filtro = this.value.toLowerCase();

            if (filtro.length > 0) {
                clientes.forEach(function(cliente) {
                    var nome = cliente.querySelector(".nome").textContent.toLowerCase();
                    var produto = cliente.querySelector(".produto").textContent.toLowerCase();
                    
                    if (nome.includes(filtro) || produto.includes(filtro)) {
                        cliente.classList.remove("invisivel");
                    } else {
                        cliente.classList.add("invisivel");
                    }
                });
            } else {
                clientes.forEach(function(cliente) {
                    cliente.classList.remove("invisivel");
                });
            }
        });
    }
});