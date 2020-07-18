using Microsoft.Reporting.WebForms;
using SistemaVenta_MVC.Models.Report;
using SistemaVenta_MVC.Utils;
using System;
using System.Collections.Generic;

namespace SistemaVenta_MVC.Root.Report
{
    public partial class VentasDeHoy : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!this.Page.IsPostBack)
            {
                this.GetRptVentasHoy();
            }
        }

        private void GetRptVentasHoy()
        {
            this.RvVentasDeHoy.LocalReport.ReportPath = Server.MapPath("~/Root/Ambiente/Rdlc/RptVentasHoy.rdlc");
            this.RvVentasDeHoy.LocalReport.DataSources.Clear();

            ReportDataSource rdc = new ReportDataSource("DSVentasHoy",this.RptVentasHoy());
            this.RvVentasDeHoy.LocalReport.DataSources.Add(rdc);
            this.RvVentasDeHoy.LocalReport.Refresh();
        }

        private IList<DtoVentasDeHoy> RptVentasHoy()
        {
            var urlClient = string.Format("/Api/Report/Rpt/RptVentasHoy");
            var restClient = new RestService();
            var responseClient = restClient.GetAsync<Respuesta<DtoVentasDeHoy>>(urlClient).Lista;
            return responseClient;
        }
    }
}