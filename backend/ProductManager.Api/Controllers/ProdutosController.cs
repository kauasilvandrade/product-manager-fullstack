
using Microsoft.AspNetCore.Mvc;
using ProductManager.Api.Models;

namespace ProductManager.Api.Controllers;

[ApiController]
[Route("api/produtos")]
public class ProdutosController : ControllerBase
{
    private static List<Produto> produtos = new()
    {
        new Produto
        {
            Id = 1,
            Nome = "Teclado",
            Preco = 150.00m,
            Estoque = 10
        },

        new Produto
        {
            Id = 2,
            Nome = "Mouse",
            Preco = 89.90m,
            Estoque = 20
        }
    };

    [HttpGet]
    public IActionResult ListarProdutos()
    {
        return Ok(produtos);
    }

    [HttpPost]
    public IActionResult CadastrarProduto(
        [FromBody] Produto produto)
    {
        if (string.IsNullOrWhiteSpace(produto.Nome)
            || produto.Preco < 0
            || produto.Estoque < 0)
        {
            return BadRequest("Dados do produto inválidos.");
        }

        produto.Id = produtos.Count == 0
            ? 1
            : produtos.Max(p => p.Id) + 1;

        produtos.Add(produto);

        return Created(
            $"/api/produtos/{produto.Id}",
            produto
        );
    }
}
