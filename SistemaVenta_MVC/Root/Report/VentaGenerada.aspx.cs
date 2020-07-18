using Microsoft.Reporting.WebForms;
using SistemaVenta_MVC.Models.Report;
using SistemaVenta_MVC.Utils;
using System;
using System.Collections.Generic;

namespace SistemaVenta_MVC.Report
{
    public partial class VentaGenerada : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!this.Page.IsPostBack)
            {
                var idVenta = Convert.ToInt32(this.Request.QueryString["id"]);
                this.GetRptVenta(idVenta);
            }
        }

        private void GetRptVenta(int pIdVenta)
        {
            this.RvVenta.LocalReport.ReportPath = Server.MapPath("~/Root/Ambiente/Rdlc/RptVenta.rdlc");
            this.RvVenta.LocalReport.DataSources.Clear();

            ReportDataSource rdc = new ReportDataSource("DSVenta",this.RptVenta(pIdVenta));
            this.RvVenta.LocalReport.DataSources.Add(rdc);
            this.RvVenta.LocalReport.Refresh();
        }

        private IList<DtoRptVenta> RptVenta(int pIdVenta)
        {
            var urlClient = string.Format("/Api/Report/RptVenta/{0}", pIdVenta);
            var restClient = new RestService();
            var responseClient = restClient.GetAsync<Respuesta<DtoRptVenta>>(urlClient).Lista;
            return responseClient;
        }
    }
}