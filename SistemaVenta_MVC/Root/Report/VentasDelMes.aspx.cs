using Microsoft.Reporting.WebForms;
using SistemaVenta_MVC.Models.Report;
using SistemaVenta_MVC.Utils;
using System;
using System.Collections.Generic;

namespace SistemaVenta_MVC.Root.Report
{
    public partial class VentasDelMes : System.Web.UI.Page
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
            this.RvVentasDelMes.LocalReport.ReportPath = Server.MapPath("~/Root/Ambiente/Rdlc/RptVentasDelMes.rdlc");
            this.RvVentasDelMes.LocalReport.DataSources.Clear();

            ReportDataSource rdc = new ReportDataSource("DSVentasDelMes", this.RptProductoMasVendido());
            this.RvVentasDelMes.LocalReport.DataSources.Add(rdc);
            this.RvVentasDelMes.LocalReport.Refresh();
        }

        private IList<DtoVentasDelMes> RptProductoMasVendido()
        {
            var urlClient = string.Format("/Api/Report/Rpt/RptVentasPorMes");
            var restClient = new RestService();
            var responseClient = restClient.GetAsync<Respuesta<DtoVentasDelMes>>(urlClient).Lista;
            return responseClient;
        }
    }
}