document.addEventListener('DOMContentLoaded', () => {
    const Carrinho = {
        chave: "cartaoSelecionado",
        
        adicionar(card) {
            const cartoes = this.obterTodos();
            if (!cartoes.find(c => c.id === card.id)) {
                cartoes.push(card);
                localStorage.setItem(this.chave, JSON.stringify(cartoes));
            }
        },

        obterTodos() {
            return JSON.parse(localStorage.getItem(this.chave) || "[]");
        }
    };

    // Configuração dos sentimentos
    const feelings = [
        { id: 1, fem: "Abalada", masc: "Abalado" },
        { id: 2, fem: "Aberta", masc: "Aberto" },
        // ... Adicione todos os 74 sentimentos aqui
    ];

    // Criação dinâmica das cartas
    function criarCartas() {
        const container = document.getElementById('cardsContainer');
        
        feelings.forEach((feeling) => {
            const card = document.createElement('article');
            card.className = 'card';
            card.dataset.id = feeling.id;
            
            card.innerHTML = `
                <div class="card-content">
                    <span class="card-text top-text">${feeling.fem}</span>
                    <div class="card-divider" aria-hidden="true"></div>
                    <span class="card-text bottom-text">${feeling.masc}</span>
                </div>
            `;

            card.addEventListener('click', () => {
                Carrinho.adicionar({
                    id: feeling.id,
                    fem: feeling.fem,
                    masc: feeling.masc,
                    horario: new Date().toISOString()
                });
                window.location.href = "minhascartas.html";
            });

            container.appendChild(card);
        });
    }

    // Controle de navegação
    function configurarNavegacao() {
        const links = {
            sentimentos: document.querySelector('a[href="sentimentos.html"]'),
            necessidades: document.querySelector('a[href="necessidades.html"]')
        };

        Object.entries(links).forEach(([pagina, elemento]) => {
            if(elemento) {
                elemento.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.location.href = `${pagina}.html`;
                });
            }
        });
    }

    // Inicialização
    criarCartas();
    configurarNavegacao();
});