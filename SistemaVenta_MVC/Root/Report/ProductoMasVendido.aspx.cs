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
    public partial class ProductoMasVendido : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!this.Page.IsPostBack)
            {
                this.GetProductoMasVendido();
            }
        }

        private void GetProductoMasVendido()
        {
            this.RvProductoMasVendido.LocalReport.ReportPath = Server.MapPath("~/Root/Ambiente/Rdlc/RptProductoMasVendido.rdlc");
            this.RvProductoMasVendido.LocalReport.DataSources.Clear();

            ReportDataSource rdc = new ReportDataSource("DSProductoMasVendido", this.RptProductoMasVendido());
            this.RvProductoMasVendido.LocalReport.DataSources.Add(rdc);
            this.RvProductoMasVendido.LocalReport.Refresh();
        }

        private IList<DtoProductoMasVendido> RptProductoMasVendido()
        {
            var list = new List<DtoProductoMasVendido>();

            var urlClient = string.Format("/Api/Report/Rpt/RptProductoMasVendido");
            var restClient = new RestService();
            var responseClient = restClient.GetAsync<Respuesta<DtoProductoMasVendido>>(urlClient).Entity;
            list.Add(responseClient);
            return list;
        }
    }
}