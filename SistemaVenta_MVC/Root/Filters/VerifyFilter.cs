using SistemaVenta_MVC.Controllers;
using System.Web;
using System.Web.Mvc;

namespace SistemaVenta_MVC.Filters
{
    public class VerifyFilter : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {

            var token = (string)HttpContext.Current.Session["TokenUser"];
            var userName = (string)HttpContext.Current.Session["UserName"];

            if (token == null)
            {
                if (filterContext.Controller is AccountController == false)
                {
                    filterContext.HttpContext.Response.Redirect("~/Account/Login");
                }
            }
            else
            {
                if (filterContext.Controller is AccountController == true)
                {
                    filterContext.HttpContext.Response.Redirect("~/Home/Index");
                }
            }
            filterContext.Controller.ViewBag.UserName = userName;
            base.OnActionExecuting(filterContext);
           
        }
    }
}