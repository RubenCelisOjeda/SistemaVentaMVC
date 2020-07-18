using SistemaVenta_MVC.Models.ConceptoVenta;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SistemaVenta_MVC.Models.Venta
{
    public class Modelo
    {
        public Modelo()
        {
            this.DtoVenta = new DtoVenta();
            this.ListaVentas = new List<DtoGrilla>();
        }
        public DtoVenta DtoVenta { get; set; }
        public IList<DtoGrilla> ListaVentas { get; set; }
    }
}