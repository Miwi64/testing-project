using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using BlazorApp.Models;
using System.Linq;

namespace BlazorApp.Data;
public class SqliteContext : DbContext
{
    public SqliteContext(DbContextOptions options) : base(options)
    {
    }
    public DbSet<Customer> Customers { get; set; }

}
