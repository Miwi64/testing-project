using BlazorApp.Data;
using BlazorApp.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace BlazorApp.Controllers;
[Route("datos")]
[ApiController]
public class CustomersController : Controller
{
    private readonly SqliteContext _context;
    public CustomersController(SqliteContext context)
    {
        _context = context;
    }
    public IActionResult Index()
    {
        List<Customer> customers = _context.Customers.ToList();
        return View(customers);
    }
}