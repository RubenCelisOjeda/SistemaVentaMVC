using SistemaVenta_MVC.Filters;
using System.Web.Mvc;

namespace SistemaVenta_MVC
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
            filters.Add(new VerifyFilter());
        }
    }
}
