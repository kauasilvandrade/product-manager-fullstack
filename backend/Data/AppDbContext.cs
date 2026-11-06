using Microsoft.EntityFrameworkCore;
using ProductManager.Api.Models;

namespace ProductManager.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) { }

    public DbSet<Produto> Produtos { get; set; }
}