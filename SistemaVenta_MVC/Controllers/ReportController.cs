using PagedList;
using SistemaVenta_MVC.Models.Report;
using SistemaVenta_MVC.Models.Venta;
using SistemaVenta_MVC.Utils;
using System.Linq;
using System.Web.Mvc;

namespace SistemaVenta_MVC.Controllers
{
    public class ReportController : Controller
    {
        // GET: Report
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }
    }
}