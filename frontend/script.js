
const API_URL = "http://localhost:5000/api/produtos";

const formulario = document.querySelector("#form-produto");
const tabela = document.querySelector("#tabela-produtos");
const mensagem = document.querySelector("#mensagem");
const totalProdutos = document.querySelector("#total-produtos");

// Exibe mensagens de sucesso ou erro.
function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = `mensagem ${tipo}`;
}

// Busca todos os produtos na API.
async function carregarProdutos() {
    try {
        const resposta = await fetch(API_URL);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar produtos.");
        }

        const produtos = await resposta.json();

        tabela.innerHTML = "";

        totalProdutos.textContent =
            `${produtos.length} produto(s)`;

        if (produtos.length === 0) {
            tabela.innerHTML = `
                <tr>
                    <td colspan="5" class="empty-state">
                        Nenhum produto cadastrado.
                    </td>
                </tr>
            `;
            return;
        }

        produtos.forEach(produto => {
            const linha = document.createElement("tr");

            const id = document.createElement("td");
            id.textContent = produto.id;

            const nome = document.createElement("td");
            nome.textContent = produto.nome;

            const preco = document.createElement("td");
            preco.textContent = Number(produto.preco)
                .toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                });

            const estoque = document.createElement("td");
            estoque.textContent = produto.estoque;

            const acoes = document.createElement("td");
            acoes.textContent = "Em breve";

            linha.append(id, nome, preco, estoque, acoes);
            tabela.appendChild(linha);
        });

    } catch (erro) {
        console.error(erro);
        mostrarMensagem(
            "Não foi possível carregar os produtos.",
            "erro"
        );
    }
}

// Envia um novo produto para a API.
formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const produto = {
        nome: document.querySelector("#nome").value.trim(),
        preco: Number(document.querySelector("#preco").value),
        estoque: Number(document.querySelector("#estoque").value)
    };

    if (!produto.nome ||
        !Number.isFinite(produto.preco) ||
        produto.preco < 0 ||
        !Number.isInteger(produto.estoque) ||
        produto.estoque < 0) {
        mostrarMensagem("Preencha os campos corretamente.", "erro");
        return;
    }

    try {
        const resposta = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(produto)
        });

        if (!resposta.ok) {
            throw new Error("Erro ao cadastrar produto.");
        }

        formulario.reset();

        await carregarProdutos();

        mostrarMensagem(
            "Produto cadastrado com sucesso!",
            "sucesso"
        );

    } catch (erro) {
        console.error(erro);
        mostrarMensagem(
            "Não foi possível cadastrar o produto.",
            "erro"
        );
    }
});

// Carrega os produtos quando a página é aberta.
carregarProdutos();
