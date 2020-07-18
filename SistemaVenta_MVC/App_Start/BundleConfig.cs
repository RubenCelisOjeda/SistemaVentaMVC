using System.Web;
using System.Web.Optimization;

namespace SistemaVenta_MVC
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/Template/css").Include(
                        "~/Root/Template/css/main.css",
                        "~/Root/Style/ValidacionFormulario.css",
                        "~/Root/Style/Layout.css",
                        "~/Root/Style/PreLoad.css",
                        "~/Root/Style/font-awasome/font-awesome.min.css"));

            bundles.Add(new StyleBundle("~/Bootstrap/css").Include(
                       "~/Root/Boostrap4/css/bootstrap.css"));

            //script de la plantilla
            bundles.Add(new ScriptBundle("~/Template/Scripts").Include(
                     "~/Root/Template/js/jquery-3.1.1.min.js",
                     "~/Root/Template/js/sweetalert2.min.js",
                     "~/Root/Template/js/material.min.js",
                     "~/Root/Template/js/ripples.min.js",
                     "~/Root/Template/js/jquery.mCustomScrollbar.concat.min.js",
                     "~/Root/Template/js/main.js"));

            //script Bootstrap - datatables
            bundles.Add(new ScriptBundle("~/Bootstrap-DataTables/Scripts").Include(
                     "~/Root/Boostrap4/js/bootstrap.min.js",
                     "~/Root/Boostrap4/DataTables/datatables.min.js",
                     "~/Root/Boostrap4/DataTables/DataTables-1.10.20/js/dataTables.bootstrap4.min.js"));

            //script global
            bundles.Add(new ScriptBundle("~/Global/Scripts").Include(
                     "~/Root/Js/Comunes/Comunes.js",
                     "~/Root/Js/Layout/Layout.js"));

            bundles.Add(new ScriptBundle("~/Script/Login").Include(
                      "~/Root/Js/Login/Login.js"));
        }
    }
}
