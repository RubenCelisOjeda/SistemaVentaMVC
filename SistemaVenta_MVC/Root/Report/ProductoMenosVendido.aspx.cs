using Microsoft.Reporting.WebForms;
using SistemaVenta_MVC.Models.Report;
using SistemaVenta_MVC.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SistemaVenta_MVC.Root.Report
{
    public partial class ProductoMenosVendido : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!this.Page.IsPostBack)
            {
                this.GetProductoMenosVendido();
            }
        }
        private void GetProductoMenosVendido()
        {
            this.RvProductoMenosVendido.LocalReport.ReportPath = Server.MapPath("~/Root/Ambiente/Rdlc/RptProductoMenosVendido.rdlc");
            this.RvProductoMenosVendido.LocalReport.DataSources.Clear();

            ReportDataSource rdc = new ReportDataSource("DSProductoMenosVendido", this.RptProductoMenosVendido());
            this.RvProductoMenosVendido.LocalReport.DataSources.Add(rdc);
            this.RvProductoMenosVendido.LocalReport.Refresh();
        }

        private IList<DtoProductoMenosVendido> RptProductoMenosVendido()
        {
            var list = new List<DtoProductoMenosVendido>();

            var urlClient = string.Format("/Api/Report/Rpt/RptProductoMenosVendido");
            var restClient = new RestService();
            var responseClient = restClient.GetAsync<Respuesta<DtoProductoMenosVendido>>(urlClient).Entity;
            list.Add(responseClient);

            return list;
        }
    }
}