<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="VentaGenerada.aspx.cs" Inherits="SistemaVenta_MVC.Report.VentaGenerada" %>

<%@ Register assembly="Microsoft.ReportViewer.WebForms" namespace="Microsoft.Reporting.WebForms" tagprefix="rsweb" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Reporte</title>
</head>
<body>
    <div class="loader-wrapper">
        <span class="loader"><span class="loader-inner"></span></span>
    </div>
    <center>
        <form id="form1" runat="server">
        <div>
        </div>
         <asp:ScriptManager runat="server" />
        <rsweb:ReportViewer ID="RvVenta" runat="server" Height="663px" Width="760px">
        </rsweb:ReportViewer>
    </form>
    </center>
</body>
</html>
