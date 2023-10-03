using VSCodeBlazer.Components.Models;
using Microsoft.AspNetCore.Mvc;
namespace VSCodeBlazer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly SqliteContext _context;
        public CustomersController(SqliteContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IEnumerable<Customer> GetCustomers()
        {
            return _context.Customers;
        }
    }
}